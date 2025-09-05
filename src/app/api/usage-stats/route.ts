import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import connectToDatabase from '@/lib/mongodb';
import { UsageStats } from '@/models/UsageStats';
import { getCurrentPeriod } from '@/utils';

export async function GET(request: NextRequest) {
  try {
    const authorization = request.headers.get('authorization');
    if (!authorization?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authorization.split('Bearer ')[1];
    const decodedToken = await adminAuth.verifyIdToken(token);
    
    await connectToDatabase();
    
    const currentPeriod = getCurrentPeriod();
    let stats = await UsageStats.findOne({ 
      userId: decodedToken.uid, 
      period: currentPeriod 
    });

    if (!stats) {
      // Create initial stats for the user
      stats = new UsageStats({
        userId: decodedToken.uid,
        period: currentPeriod,
        apiCalls: Math.floor(Math.random() * 1000), // Mock data
        storageUsed: Math.floor(Math.random() * 100), // Mock data in MB
        bandwidthUsed: Math.floor(Math.random() * 500), // Mock data in MB
      });
      await stats.save();
    }

    return NextResponse.json({ 
      success: true, 
      stats: {
        apiCalls: stats.apiCalls,
        storageUsed: stats.storageUsed,
        bandwidthUsed: stats.bandwidthUsed,
        period: stats.period,
      }
    });
  } catch (error) {
    console.error('Error fetching usage stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authorization = request.headers.get('authorization');
    if (!authorization?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authorization.split('Bearer ')[1];
    const decodedToken = await adminAuth.verifyIdToken(token);
    
    const body = await request.json();
    const { apiCalls, storageUsed, bandwidthUsed, period } = body;

    await connectToDatabase();
    
    const targetPeriod = period || getCurrentPeriod();
    
    let stats = await UsageStats.findOne({ 
      userId: decodedToken.uid, 
      period: targetPeriod 
    });

    if (stats) {
      // Update existing stats
      if (apiCalls !== undefined) stats.apiCalls += apiCalls;
      if (storageUsed !== undefined) stats.storageUsed = storageUsed;
      if (bandwidthUsed !== undefined) stats.bandwidthUsed += bandwidthUsed;
      await stats.save();
    } else {
      // Create new stats
      stats = new UsageStats({
        userId: decodedToken.uid,
        period: targetPeriod,
        apiCalls: apiCalls || 0,
        storageUsed: storageUsed || 0,
        bandwidthUsed: bandwidthUsed || 0,
      });
      await stats.save();
    }

    return NextResponse.json({ 
      success: true, 
      stats: {
        apiCalls: stats.apiCalls,
        storageUsed: stats.storageUsed,
        bandwidthUsed: stats.bandwidthUsed,
        period: stats.period,
      }
    });
  } catch (error) {
    console.error('Error updating usage stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

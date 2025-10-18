import { Request, Response, NextFunction } from 'express';
import { checkUserUsage, getUserTier, canCreateResume, getTierLimits, canAccessTemplate } from '../services/tierEnforcement';

export interface TierRequest extends Request {
  userTier?: string;
  userUsage?: any;
}

export async function enforceResumeLimit(req: TierRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.body.userId || req.headers['x-user-id'];
    
    if (!userId) {
      return res.status(401).json({ error: 'User authentication required' });
    }

    const userUsage = await checkUserUsage(userId);
    const userTier = await getUserTier(userId);
    
    if (!canCreateResume(userTier, userUsage.resumesThisMonth)) {
      const limits = getTierLimits(userTier);
      return res.status(403).json({ 
        error: 'Resume limit reached for your plan',
        upgradeRequired: true,
        currentUsage: userUsage.resumesThisMonth,
        limit: limits.resumesPerMonth,
        tier: userTier,
        resetDate: userUsage.resetDate
      });
    }

    req.userTier = userTier;
    req.userUsage = userUsage;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to check user limits' });
  }
}

export async function enforceTemplateAccess(req: TierRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.body.userId || req.headers['x-user-id'];
    const templateTier = req.body.templateTier || req.query.templateTier || 'free';
    
    if (!userId) {
      return res.status(401).json({ error: 'User authentication required' });
    }

    const userTier = await getUserTier(userId);
    
    if (!canAccessTemplate(userTier, templateTier as string)) {
      return res.status(403).json({ 
        error: 'Premium template access requires upgrade',
        upgradeRequired: true,
        requiredTier: templateTier === 'premium' ? 'professional' : 'basic',
        currentTier: userTier
      });
    }

    req.userTier = userTier;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to check template access' });
  }
}

export async function enforceCoverLetterAccess(req: TierRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.body.userId || req.headers['x-user-id'];
    
    if (!userId) {
      return res.status(401).json({ error: 'User authentication required' });
    }

    const userTier = await getUserTier(userId);
    const limits = getTierLimits(userTier);
    
    if (!limits.coverLetters) {
      return res.status(403).json({ 
        error: 'Cover letter generation requires Basic Pro or higher',
        upgradeRequired: true,
        requiredTier: 'basic',
        currentTier: userTier
      });
    }

    req.userTier = userTier;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to check cover letter access' });
  }
}

export async function enforceBlockchainAccess(req: TierRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.body.userId || req.headers['x-user-id'];
    
    if (!userId) {
      return res.status(401).json({ error: 'User authentication required' });
    }

    const userTier = await getUserTier(userId);
    
    // Blockchain verification available for Professional and Enterprise only
    if (!['professional', 'enterprise'].includes(userTier)) {
      return res.status(403).json({ 
        error: 'Blockchain verification requires Professional plan or higher',
        upgradeRequired: true,
        requiredTier: 'professional',
        currentTier: userTier
      });
    }

    req.userTier = userTier;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to check blockchain access' });
  }
}

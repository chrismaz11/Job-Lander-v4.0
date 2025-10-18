# Job-Lander v4.0 - Production Deployment Runbook

## 🚀 Quick Deploy Commands

### Frontend Deployment
```bash
# Build and deploy frontend
npm run build
git add . && git commit -m "Deploy frontend updates"
git push origin main
# Amplify auto-deploys from main branch
```

### Backend Deployment
```bash
# Deploy Lambda function
cd lambda-full
zip -r ../lambda-full.zip .
aws lambda update-function-code --function-name joblander-api --zip-file fileb://../lambda-full.zip --region us-east-1
```

### Environment Variables Required

#### AWS Secrets Manager (joblander/prod/config)
```json
{
  "DATABASE_URL": "postgresql://postgres:PASSWORD@database-1.cufu8ooom2yl.us-east-1.rds.amazonaws.com:5432/postgres",
  "STRIPE_SECRET_KEY": "sk_live_...",
  "GEMINI_API_KEY": "your_gemini_key",
  "JSEARCH_API_KEY": "your_jsearch_key",
  "NODE_ENV": "production",
  "REGION": "us-east-1"
}
```

#### Frontend Environment (.env.production)
```bash
VITE_API_URL=https://7pgfihe60m.execute-api.us-east-1.amazonaws.com/Prod
VITE_APP_URL=https://joblander.org
```

## 🧪 Production Testing Checklist

### Critical Path Tests
- [ ] Health check: `curl https://7pgfihe60m.execute-api.us-east-1.amazonaws.com/Prod/api/health`
- [ ] Resume parsing: Upload PDF/DOCX file via frontend
- [ ] Job search: Search "Software Engineer" + location
- [ ] AI enhancement: Test bullet point enhancement
- [ ] PDF export: Generate and download resume PDF
- [ ] Cover letter: Generate for specific job/company

### Frontend Tests
- [ ] Navigate to https://joblander.org
- [ ] Upload resume file → form populates
- [ ] Search jobs → results display
- [ ] Generate cover letter → text appears
- [ ] Export PDF → download works
- [ ] Health page: https://joblander.org/healthz

## 🔄 Rollback Plan

### Frontend Rollback
```bash
# Revert to previous commit
git log --oneline -5  # Find previous commit hash
git revert <commit-hash>
git push origin main
```

### Backend Rollback
```bash
# Deploy previous Lambda version
aws lambda update-function-code --function-name joblander-api --zip-file fileb://lambda-backup.zip --region us-east-1
```

## 📊 Monitoring & Logs

### Health Monitoring
- Health endpoint: `https://7pgfihe60m.execute-api.us-east-1.amazonaws.com/Prod/api/health`
- Expected response: `{"status": "ok", "environment": "production"}`

### Log Access
```bash
# View Lambda logs
aws logs describe-log-streams --log-group-name "/aws/lambda/joblander-api" --region us-east-1
aws logs get-log-events --log-group-name "/aws/lambda/joblander-api" --log-stream-name "STREAM_NAME" --region us-east-1
```

### Error Monitoring
- CloudWatch dashboard: AWS Console → CloudWatch → Dashboards
- Lambda errors: AWS Console → Lambda → joblander-api → Monitoring
- API Gateway errors: AWS Console → API Gateway → landerv4 → Monitoring

## 🚨 Troubleshooting

### Common Issues

#### CORS Errors
- Check API Gateway CORS settings
- Verify Lambda handler CORS headers
- Test with: `curl -H "Origin: https://joblander.org" API_ENDPOINT`

#### File Upload Issues
- Check Lambda timeout (currently 20s)
- Verify file size limits (10MB max)
- Test multipart/form-data handling

#### Database Connection
- Verify RDS instance status
- Check security group rules
- Test connection: `psql -h database-1.cufu8ooom2yl.us-east-1.rds.amazonaws.com -U postgres`

#### Secrets Access
- Verify Lambda execution role permissions
- Check AWS Secrets Manager access
- Test: `aws secretsmanager get-secret-value --secret-id joblander/prod/config`

## 📈 Performance Optimization

### Lambda Optimization
- Monitor cold start times
- Consider provisioned concurrency for high traffic
- Optimize bundle size by removing unused dependencies

### Database Optimization
- Monitor RDS performance metrics
- Add indexes for frequently queried fields
- Consider read replicas for scaling

### CDN Optimization
- CloudFront cache settings
- Compress static assets
- Optimize image sizes

## 🔐 Security Checklist

- [ ] All secrets stored in AWS Secrets Manager
- [ ] HTTPS enforced on all endpoints
- [ ] CORS properly configured
- [ ] File upload validation in place
- [ ] Rate limiting configured (if needed)
- [ ] Database access restricted to Lambda
- [ ] No hardcoded credentials in code

## 📞 Support Contacts

- AWS Support: Enterprise support plan active
- Domain: joblander.org (Route 53 managed)
- SSL: AWS Certificate Manager
- Monitoring: CloudWatch alarms configured

---

**Last Updated**: October 17, 2025
**Version**: 4.0 Production MVP
**Status**: ✅ All systems operational

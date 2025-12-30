# Google Meet Bot Integration Guide

## Overview

This document outlines the approach for integrating a Google Meet bot that can join ritual sessions, analyze conversations, and detect personal information exchanges.

## Integration Options

### Option 1: Recall.ai (Recommended)
- **Website**: https://www.recall.ai/
- **Features**:
  - Real-time meeting transcription
  - Speaker identification
  - Custom keyword detection
  - Webhook notifications
- **Pricing**: Starts at $0.50 per meeting hour
- **Integration Steps**:
  1. Sign up for Recall.ai API access
  2. Configure webhook endpoints
  3. Set up meeting bot to join Google Meet links
  4. Configure keyword detection for personal information (phone numbers, social media handles)
  5. Process webhook events to notify admins

### Option 2: Fireflies.ai
- **Website**: https://fireflies.ai/
- **Features**:
  - Meeting recording and transcription
  - AI-powered insights
  - CRM integrations
- **Pricing**: Starts at $10/user/month
- **Limitations**: Primarily designed for team collaboration, may require custom integration

### Option 3: Custom Implementation with Google Meet API
- **Complexity**: High
- **Requirements**:
  - Google Workspace account
  - Google Calendar API integration
  - Custom bot development using Puppeteer or similar
  - Speech-to-text service (Google Cloud Speech-to-Text)
- **Estimated Development Time**: 4-6 weeks

## Recommended Approach

Use **Recall.ai** for the following reasons:
1. Purpose-built for meeting bots
2. Simple API integration
3. Real-time transcription
4. Cost-effective for pay-per-use model
5. Reliable Google Meet support

## Implementation Steps

### 1. Setup Recall.ai Account
```bash
# Install Recall.ai SDK
npm install @recall.ai/sdk
```

### 2. Create Meeting Bot
```typescript
import { RecallClient } from '@recall.ai/sdk';

const client = new RecallClient({ apiKey: process.env.RECALL_API_KEY });

async function createMeetingBot(meetLink: string, ritualId: string) {
  const bot = await client.bots.create({
    meeting_url: meetLink,
    bot_name: 'Dharmic Connect Assistant',
    transcription_options: {
      provider: 'default',
    },
    real_time_transcription: {
      destination_url: `${process.env.API_URL}/webhooks/transcription`,
    },
  });

  // Store bot ID with ritual
  await supabase
    .from('rituals')
    .update({ meeting_bot_id: bot.id })
    .eq('id', ritualId);

  return bot;
}
```

### 3. Process Transcription Webhooks
```typescript
// API endpoint to receive transcription events
app.post('/webhooks/transcription', async (req, res) => {
  const { bot_id, transcript, speaker } = req.body;

  // Detect personal information
  const personalInfo = detectPersonalInfo(transcript);

  if (personalInfo.length > 0) {
    // Notify admin
    await notifyAdmin(bot_id, personalInfo);
    
    // Update ritual record
    await supabase
      .from('rituals')
      .update({
        personal_info_detected: true,
        admin_notified: true,
      })
      .eq('meeting_bot_id', bot_id);
  }

  res.status(200).send('OK');
});
```

### 4. Personal Information Detection
```typescript
function detectPersonalInfo(text: string): Array<{type: string, value: string}> {
  const detected = [];

  // Phone number patterns
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  const phones = text.match(phoneRegex);
  if (phones) {
    phones.forEach(phone => detected.push({ type: 'phone', value: phone }));
  }

  // Email patterns
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const emails = text.match(emailRegex);
  if (emails) {
    emails.forEach(email => detected.push({ type: 'email', value: email }));
  }

  // Social media handles
  const socialRegex = /@[a-zA-Z0-9_]+/g;
  const handles = text.match(socialRegex);
  if (handles) {
    handles.forEach(handle => detected.push({ type: 'social_media', value: handle }));
  }

  // WhatsApp mentions
  if (text.toLowerCase().includes('whatsapp')) {
    detected.push({ type: 'whatsapp_mention', value: 'WhatsApp mentioned' });
  }

  return detected;
}
```

### 5. Admin Notification
```typescript
async function notifyAdmin(botId: string, personalInfo: Array<any>) {
  // Get ritual details
  const { data: ritual } = await supabase
    .from('rituals')
    .select('*, profiles(*)')
    .eq('meeting_bot_id', botId)
    .single();

  // Send email to admin
  await sendEmail({
    to: 'admin@yourdomain.com',
    subject: `Personal Information Detected - Ritual ${ritual.id}`,
    html: `
      <h2>Personal Information Exchange Detected</h2>
      <p><strong>Ritual ID:</strong> ${ritual.id}</p>
      <p><strong>Seeker:</strong> ${ritual.profiles.full_name}</p>
      <p><strong>Detected Information:</strong></p>
      <ul>
        ${personalInfo.map(info => `<li>${info.type}: ${info.value}</li>`).join('')}
      </ul>
      <p>Please review the meeting recording and take appropriate action.</p>
    `,
  });
}
```

## Privacy & Compliance

### User Consent
- Add consent checkbox during ritual booking
- Clearly state that meetings will be recorded and analyzed
- Provide privacy policy link

### Data Storage
- Store transcriptions securely
- Implement data retention policy (e.g., 30 days)
- Allow users to request deletion

### GDPR Compliance
- Provide data access requests
- Implement right to be forgotten
- Maintain audit logs

## Cost Estimation

For 100 rituals per month with average 1-hour duration:
- Recall.ai: $50/month (100 hours × $0.50)
- Additional costs: Email service, storage

## Alternative: Placeholder Implementation

For MVP/demo purposes, implement a placeholder system:

```typescript
// Generate mock analysis
async function generateMockAnalysis(ritualId: string) {
  const analysisDoc = {
    ritual_id: ritualId,
    duration: '45 minutes',
    participants: 2,
    personal_info_detected: false,
    summary: 'Ritual completed successfully. No personal information exchanged.',
    created_at: new Date().toISOString(),
  };

  // Store in database
  await supabase
    .from('meeting_analyses')
    .insert(analysisDoc);

  return analysisDoc;
}
```

## Next Steps

1. Decide on integration approach (Recall.ai vs custom vs placeholder)
2. Set up Recall.ai account if chosen
3. Implement webhook endpoints
4. Add consent UI to booking flow
5. Test with sample meetings
6. Deploy to production
7. Monitor and optimize

## Support

For questions or issues:
- Recall.ai Documentation: https://docs.recall.ai/
- Support Email: support@recall.ai

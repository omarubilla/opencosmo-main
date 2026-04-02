import { google } from "googleapis";

function getOAuthClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
  oauth2Client.setCredentials({ refresh_token: refreshToken });
  return oauth2Client;
}

export function isGoogleCalendarConfigured() {
  return Boolean(getOAuthClient());
}

export async function createStrategyCallCalendarEvent({
  fullName,
  email,
  company,
  notes,
  startISO,
  endISO,
  timeZone,
}) {
  const auth = getOAuthClient();
  if (!auth) {
    return null;
  }

  const calendar = google.calendar({ version: "v3", auth });
  const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";
  const ownerEmail = process.env.GOOGLE_CALENDAR_HOST_EMAIL;
  const attendeeEmails = [email, ownerEmail].filter(Boolean);

  const response = await calendar.events.insert({
    calendarId,
    conferenceDataVersion: 1,
    sendUpdates: "all",
    requestBody: {
      summary: `OpenCosmo Strategy Call${company ? ` • ${company}` : ""}`,
      description: [
        `Booked by: ${fullName}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : null,
        `Timezone: ${timeZone}`,
        notes ? `Notes: ${notes}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
      start: {
        dateTime: startISO,
        timeZone,
      },
      end: {
        dateTime: endISO,
        timeZone,
      },
      attendees: attendeeEmails.map((attendeeEmail) => ({ email: attendeeEmail })),
      conferenceData: {
        createRequest: {
          requestId: crypto.randomUUID(),
          conferenceSolutionKey: {
            type: "hangoutsMeet",
          },
        },
      },
    },
  });

  const videoEntry = response.data.conferenceData?.entryPoints?.find(
    (entry) => entry.entryPointType === "video"
  );

  return {
    calendarEventId: response.data.id,
    calendarEventLink: response.data.htmlLink || null,
    meetLink: response.data.hangoutLink || videoEntry?.uri || null,
  };
}
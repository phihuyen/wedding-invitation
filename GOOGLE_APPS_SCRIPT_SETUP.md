# Google Apps Script Setup Guide for Wishes Feature

This guide will help you set up a Google Apps Script Web App to handle wishes submissions and store them in a Google Sheet.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "Wedding Wishes"
4. Set up the header row in row 1:
   - Column A: `timestamp`
   - Column B: `name`
   - Column C: `phone_number`
   - Column D: `message`
   - Column E: `attendance`
5. Format the first row (make it bold, add background color, etc.)

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any default code and paste the following:

```javascript
// Replace 'Sheet1' with your actual sheet name if different
const SHEET_NAME = "Sheet1";

// Handle GET requests - retrieve wishes
function doGet(e) {
  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();

  // Skip header row
  const headers = data[0];
  const rows = data.slice(1);

  // Convert to JSON array
  const wishes = rows.map((row) => {
    // Map attendance values to lowercase with hyphens for consistency
    let attendance = row[4] || ""; // Column E
    if (attendance === "ATTENDING") attendance = "attending";
    if (attendance === "NOT_ATTENDING") attendance = "not-attending";
    if (attendance === "MAYBE") attendance = "maybe";

    return {
      timestamp: row[0] || "",
      name: row[1] || "",
      phone_number: row[2] || "",
      message: row[3] || "",
      attending: attendance,
    };
  });

  return ContentService.createTextOutput(JSON.stringify(wishes)).setMimeType(
    ContentService.MimeType.JSON
  );
}

// Handle POST requests - add new wish
function doPost(e) {
  try {
    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    // Parse the JSON data from the request
    const jsonData = JSON.parse(e.postData.contents);

    // Get current timestamp
    const timestamp = new Date().toISOString();

    // Prepare row data
    const rowData = [
      timestamp,
      jsonData.name || "",
      jsonData.phone_number || "",
      jsonData.message || "",
      jsonData.attendance || "",
    ];

    // Append to sheet
    sheet.appendRow(rowData);

    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Wish submitted successfully",
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Save** (💾 icon) or press `Ctrl+S` (Windows) / `Cmd+S` (Mac)
4. Give your project a name (e.g., "Wedding Wishes API")

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
3. Configure the deployment:
   - **Description**: "Wedding Wishes API v1" (optional)
   - **Execute as**: Select **Me** (your email)
   - **Who has access**: Select **Anyone** (important for public access)
4. Click **Deploy**
5. **IMPORTANT**: Authorize the script:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to [Project Name] (unsafe)**
   - Click **Allow**
6. Copy the **Web App URL** - it will look like:
   ```
   https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/exec
   ```
7. Extract the **Deployment ID** from the URL:
   - The long string after `/macros/s/` and before `/exec`
   - Example: `AKfycbxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

## Step 4: Update Your Code

### Update `src/config/config.js`

Replace the `appScriptKey` with your Deployment ID:

```javascript
appScriptKey: "YOUR_DEPLOYMENT_ID_HERE",
```

### Update `vite.config.js`

Update the proxy target URL to use your deployment URL:

```javascript
server: {
  proxy: {
    "/api": {
      target: "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID_HERE/exec",
      changeOrigin: true,
      secure: false,
      rewrite: () => "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID_HERE/exec",
    },
  },
},
```

## Step 5: For Production (GitHub Pages)

Since the proxy only works in development, you'll need to update the `Wishes.jsx` component to use the full URL in production.

### Option A: Use the config value (Recommended)

Update `src/pages/Wishes.jsx`:

```javascript
import config from "@/config/config";

// Use the full Google Apps Script URL in production
const getApiUrl = () => {
  if (import.meta.env.DEV) {
    return "/api"; // Use proxy in development
  }
  return `https://script.google.com/macros/s/${config.data.appScriptKey}/exec`;
};

const API_URL = getApiUrl();
```

### Option B: Environment variable

Create `.env` file:

```
VITE_APP_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Then in `Wishes.jsx`:

```javascript
const API_URL = import.meta.env.VITE_APP_SCRIPT_URL || "/api";
```

## Step 6: Test the Setup

1. Start your development server:

   ```bash
   npm run dev
   # or
   bun run dev
   ```

2. Navigate to the Wishes section
3. Submit a test wish:
   - Enter your name
   - Select attendance option
   - Enter a test message
   - Click submit

4. Check your Google Sheet - you should see the new row added!

5. Verify the wish appears in the wishes list on the page

## Troubleshooting

### CORS Errors

If you see CORS errors:

- Make sure the Web App deployment has "Who has access" set to **Anyone**
- The script needs to be redeployed after changing access settings

### 404 or 405 Errors

- Verify the Deployment ID is correct
- Make sure you copied the full URL including `/exec` at the end
- Try redeploying the script

### Data Not Appearing

- Check the Google Sheet to see if data is being added
- Verify the sheet name matches in the script (default is 'Sheet1')
- Check the browser console for error messages

### Permission Denied

- Make sure you authorized the script when deploying
- Go to Apps Script → Executions to see if there are permission errors

## Security Notes

⚠️ **Important Security Considerations:**

1. The Google Apps Script Web App will be publicly accessible
2. Anyone with the URL can submit wishes (which is usually fine for a wedding invitation)
3. Consider adding rate limiting or CAPTCHA if you're concerned about spam
4. The sheet data is stored in your Google account - make sure you're comfortable with this

## Advanced: Adding Spam Protection

If you want to add basic spam protection, you can modify the `doPost` function:

```javascript
function doPost(e) {
  try {
    // Basic validation
    const jsonData = JSON.parse(e.postData.contents);

    if (!jsonData.name || jsonData.name.length < 2) {
      throw new Error("Name must be at least 2 characters");
    }

    if (!jsonData.message || jsonData.message.length < 5) {
      throw new Error("Message must be at least 5 characters");
    }

    // Continue with existing code...
    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    // ... rest of the code
  } catch (error) {
    // ... error handling
  }
}
```

## Need Help?

- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [ContentService Reference](https://developers.google.com/apps-script/reference/content/content-service)
- [SpreadsheetApp Reference](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app)

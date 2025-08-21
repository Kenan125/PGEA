import { makeStyles } from "@fluentui/react-components";

// Define breakpoints for responsive design
const breakpoints = {
  small: "480px",
  medium: "768px",
  large: "1024px",
};

export const useStyles = makeStyles({
  // General container for the main form area
  myTestBackground: {
    backgroundColor: "#d9d9d9",
    borderRadius: "0px 0px 12px 12px",
    padding: "20px 15px", // Reduced padding for smaller screens
    width: "100%",
    boxSizing: "border-box",
    fontFamily: `"Segoe UI", sans-serif`,
    marginTop: "0px",
    minHeight: "100vh", // Ensure it fills the viewport height
    display: "flex",
    flexDirection: "column",
    [`@media (min-width: ${breakpoints.medium})`]: {
      padding: "50px 30px", // Original padding for larger screens
    },
  },

  // Title styles
  title: {
    fontWeight: 700,
    marginTop: "10px",
    marginBottom: "20px",
    fontSize: "18px",
    color: "#757575",
    [`@media (min-width: ${breakpoints.medium})`]: {
      fontSize: "20px",
    },
  },

  // Textarea component style
  textarea: {
    resize: "none",
  },

  // Top row container for message input and stats
  topRow: {
    display: "flex",
    flexDirection: "column", // Stack vertically on small screens
    justifyContent: "space-between",
    marginBottom: "30px",
    gap: "20px",
    [`@media (min-width: ${breakpoints.medium})`]: {
      flexDirection: "row", // Side-by-side on larger screens
      flexWrap: "wrap",
      gap: "0px",
    },
  },

  // Middle row for action buttons
  middleRow: {
    display: "flex",
    flexDirection: "column", // Stack on small screens
    justifyContent: "space-between",
    gap: "15px",
    [`@media (min-width: ${breakpoints.medium})`]: {
      flexDirection: "row", // Side-by-side on larger screens
    },
  },

  // Container for tertiary buttons like 'Preview' and 'Customize'
  tertiaryButtons: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },

  // Container for the 'Customize' dropdown
  customize: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start", // Align to start on small screens
    gap: "10px",
    [`@media (min-width: ${breakpoints.medium})`]: {
      justifyContent: "flex-end", // Align to end on larger screens
    },
  },

  // Left column, typically for main inputs
  leftColumn: {
    flexBasis: "100%", // Full width on small screens
    display: "flex",
    flexDirection: "column",
    [`@media (min-width: ${breakpoints.medium})`]: {
      flexBasis: "60%", // 60% width on larger screens
      minWidth: "250px",
      marginRight: "10px",
    },
  },

  // General label styles
  label: {
    fontWeight: 600,
    marginBottom: "4px",
    color: "#353535",
    fontSize: "15px",
  },

  // Right column, for secondary info or controls
  rightColumn: {
    width: "100%", // Full width on small screens
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",
    color: "#757575",
    marginTop: "0",
    [`@media (min-width: ${breakpoints.medium})`]: {
      width: "160px", // Fixed width on larger screens
      marginTop: "auto",
    },
  },

  // Top-right specific container for stats
  topRight: {
    width: "100%", // Full width on small screens
    display: "flex",
    flexDirection: "row", // Horizontal layout for stats
    justifyContent: "space-between",
    flexWrap: "wrap",
    fontSize: "14px",
    color: "#757575",
    gap: "10px",
    [`@media (min-width: ${breakpoints.medium})`]: {
      flexDirection: "column", // Vertical on larger screens
      justifyContent: "flex-start",
      marginTop: "15%",
      marginBottom: "10%",
    },
  },

  // Checkbox container
  checkbox: {
    display: "flex",
    alignItems: "center",
    marginTop: "20px",
  },

  // Title for a group of checkboxes
  checkboxTitle: {
    color: "#757575",
    marginBottom: "10px",
  },

  // Label for an individual checkbox
  checkboxLabel: {
    color: "#000",
    marginLeft: "20px",
    marginTop: "10px",
    alignItems: "end",
  },

  // Form control styles for checkbox
  checkboxFormControl: {
    display: "flex",
    flexDirection: "column",
    width: "auto",
    color: "#757575",
    padding: "8px 10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    height: "35px",
    boxSizing: "border-box",
  },

  // Bottom row container
  bottomRow: {
    display: "flow-root",
    width: "10",
    flexDirection: "column", // Stack on small screens
    justifyContent: "space-between",
    marginTop: "40px",
    gap: "20px",
    alignItems: "stretch", // Stretch items to full width
    [`@media (min-width: ${breakpoints.medium})`]: {
      flexDirection: "row", // Side-by-side on larger screens
      flexWrap: "wrap",
      gap: "10px",
      alignItems: "center",
    },
  },

  // Column for message input
  messageColumn: {
    padding: "8px 10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    height: "35px",
    width: "100%", // Full width
    marginBottom: "8px",
    color: "#757575",
    [`@media (min-width: ${breakpoints.medium})`]: {
      width: "160px",
    },
  },

  // Primary action button
  mainButton: {
    backgroundColor: "#353535",
    color: "#ffffff",
    cursor: "pointer",
    padding: "8px 30px",
    borderRadius: "4px",
  },

  // Container for last send date
  lastSendDate: {
    display: "flex",
    flexDirection: "column", // Stack on small screens
    justifyContent: "space-between",
    gap: "10px",
    [`@media (min-width: ${breakpoints.medium})`]: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
  },

  // Container for date and time inputs
  dateTimeContainer: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  // Row for main form buttons (OK, Cancel)
  buttonRow: {
    display: "flex",
    fontSize: "14px",
    borderRadius: "4px",
    padding: "8px",
    boxSizing: "border-box",
    gap: "10px", // Reduced gap for smaller screens
    justifyContent: "center",
    marginTop: "flex", // Pushes the button row to the bottom
    [`@media (min-width: ${breakpoints.medium})`]: {
      gap: "60px",
    },
  },

  // Column for phone number dropdown
  phoneNumberColumn: {
    // This container now correctly sizes the dropdown within it
    display: "flex",
    flexDirection: "column",
    width: "100%", // Full width
    color: "#757575",
    boxSizing: "border-box",
    [`@media (min-width: ${breakpoints.medium})`]: {
      minWidth: "250px",
    },
  },

  // Fluent UI Dropdown style override
  Dropdown: {
    width: "100%",
    minWidth: 0, // Prevents dropdown from expanding beyond its container
  },

  // Send method dropdown container
  sendMethod: {
    padding: "8px 10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    height: "35px",
    width: "100%", // Full width
    marginBottom: "8px",
    color: "#757575",
    [`@media (min-width: ${breakpoints.medium})`]: {
      width: "160px",
    },
  },

  // Message input textarea
  messageInput: {
    width: "100%",
    height: "100px",
    fontSize: "14px",
    borderRadius: "4px",
    padding: "8px",
    boxSizing: "border-box",
    boxShadow: "0 1px 2px rgba(0,0,0,0.14)",
  },

  // Informational row
  infoRow: {
    marginTop: "0px",
    color: "#353535",
    marginBottom: "50px",
  },

  // Row for date inputs
  dateRow: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: "10px",
    alignItems: "center",
    gap: "10px",
  },

  // Container for interval minutes input
  intervalMinutes: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: "10px",
    width: "100%",
  },

  // Container for batch size input
  batchSize: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: "10px",
    width: "100%",
  },

  // Input for interval minutes
  intervalMinutesInput: {
    width: "93px",
  },

  // Input for batch size
  batchSizeInput: {
    width: "93px",
  },

  // Row for time inputs
  timeRow: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
  },

  // Container for start time
  start: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: "10px",
  },

  // Container for end time
  end: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: "10px",
  },

  // Container for time restrictions section
  timeRestrictions: {
    marginTop: "30px",
  },

  // Generic container for scheduled/batch sections
  scheduledContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop: "40px",
    marginBottom: "20px",
    paddingRight: "10px",
    borderRadius: "10px",
  },
  containerBatch: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop: "40px",
    marginBottom: "20px",
    paddingRight: "10px",
    borderRadius: "10px",
  },
  containerColumnDate: {
    display: "flex",
    flexDirection: "column",
    
    width: "100%",
    marginTop: "40px",
    marginBottom: "20px",
    paddingRight: "10px",
    borderRadius: "10px",
  },

  // Title for scheduled section
  scheduledTitle: {
    fontWeight: 700,
    fontSize: "16px",
    textAlign: "center",
    marginBottom: "20px",
    marginTop: "10px",
    color: "#a3a3a3",
  },

  // Content area for scheduled section
  scheduledContent: {
    display: "flex",
    flexDirection: "column", // Stack on small screens
    justifyContent: "space-between",
    gap: "15px",
    [`@media (min-width: ${breakpoints.medium})`]: {
      flexDirection: "row",
    },
  },

  // General form label
  formLabel: {
    fontWeight: 600,
    color: "#353535",
    fontSize: "15px",
  },

  // General form control (input, select)
  formControl: {
    padding: "8px 10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    height: "35px",
    boxSizing: "border-box",
    color: "#757575",
  },

  // Container for settings page
  container: {
    backgroundColor: "#d9d9d9",
    display: "flex",
    flexDirection: "column",
    padding: "20px 15px",
    borderRadius: "0px 0px 12px 12px",
    width: "100%",
    margin: "20px auto",
    marginTop: "0px",
    boxSizing: "border-box",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    [`@media (min-width: ${breakpoints.medium})`]: {
      padding: "50px 30px",
    },
  },

  // Character set selection area
  charSet: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "8px 10px",
    fontSize: "14px",
    width: "100%",
    marginBottom: "80px",
    color: "#757575",
    justifyContent: "center",
  },

  // Dark label style
  lblDark: {
    color: "#353535",
    fontWeight: 500,
    marginBottom: "0px",
  },

  // Light label style
  lblLight: {
    marginTop: "0px",
    marginBottom: "30px",
    color: "#353535",
  },

  // Error message style
  error: {
    color: "#ff0000",
    display: "flex",
    justifyContent: "flex-start", // Align left on small screens
    fontSize: "12px",
    marginTop: "4px",
    [`@media (min-width: ${breakpoints.medium})`]: {
      justifyContent: "flex-end",
    },
  },

  // Preview modal container (overlay)
  previewContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    flexDirection: "column",
    gap: "12px",
    padding: "15px",
  },

  // Preview modal content area
  previewContent: {
    backgroundColor: "#d9d9d9",
    padding: "20px",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "500px", // Max width for larger screens
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
  },

  // Title within the preview modal
  previewTitle: {
    fontWeight: "bold",
    fontSize: "16px",
  },

  // Message area within the preview
  previewMessage: {
    whiteSpace: "pre-wrap",
    minHeight: "100px",
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "4px",
    backgroundColor: "#fff",
    marginTop: "8px",
  },

  // Recipient list in the preview
  previewRecipient: {
    maxHeight: "100px",
    overflowY: "auto",
    paddingLeft: "20px",
    marginTop: "4px",
  },

  // Button container in the preview modal
  previewButton: {
    display: "flex",
    justifyContent: "center",
    marginTop: "12px",
  },
  
  // Styles for the iOS-like message preview
  body: {
    height: '100%',
    width: '100%',
    margin: 0,
    padding: 0,
    color: '#eee',
    fontFamily: 'monospace',
    background: '#222',
  },
  link: {
    color: 'currentColor',
  },
  nibIosTemplate: {
    width: '100%',
    maxWidth: '400px',
    height: '600px',
    margin: '1rem auto',
    fontFamily: 'sans-serif',
    lineHeight: 1.25,
    background: '#fefefe',
    borderRadius: '0.25rem',
    boxShadow: '0 0 3px #ddd',
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'column',
  },
  nibIosMessages: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    flexGrow: 1,
  },
  nibIosTime: {
    fontSize: '0.8em',
    color: '#777',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  nibIosMsg: {
    alignSelf: 'flex-start',
    position: 'relative',
    maxWidth: '80%',
    margin: '0.25rem',
    padding: '0.75rem 1rem',
    background: '#e5e5ea',
    borderRadius: '1rem',
    wordWrap: 'break-word',
  },
  nibSent: {
    color: '#fff',
    background: '#0b93f6',
    alignSelf: 'flex-end',
  },
  nibReceived: {
    color: '#111',
  },
  nibIosTyping: {
    alignSelf: 'flex-start',
    position: 'relative',
    maxWidth: '80%',
    margin: '0.25rem',
    padding: '0.75rem 1rem',
    background: '#e5e5ea',
    borderRadius: '1rem',
    fontSize: '50px',
    lineHeight: '20px',
  },
  nibIosTypingText: {
    background: 'linear-gradient(45deg, #eee, #333)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  nibIosMsgAfter: {
    content: '""',
    height: '30px',
    width: '20px',
    position: 'absolute',
    bottom: '6px',
    left: '-17px',
    boxShadow: '7px 5px 0 1px #e5e5ea',
    borderRadius: '10px',
  },
  nibIosMsgSentAfter: {
    left: 'auto',
    right: '-17px',
    boxShadow: '-7px 5px 0 1px #0b93f6',
  },
  nibIosTypingBeforeAfter: {
    content: '""',
    display: 'block',
    height: '15px',
    width: '15px',
    position: 'absolute',
    bottom: 0,
    left: '-5px',
    background: '#e5e5ea',
    borderRadius: '10px',
  },
  nibIosTypingBefore: {
    height: '7px',
    width: '7px',
    bottom: '-5px',
    left: '-12px',
    background: '#e5e5ea',
    borderRadius: '10px',
  },
});

export const formatJobTimeline = (timeline) => {
    if (!timeline) return "";
    
    // Split the string to extract both dates
    const [startDate, endDate] = timeline.split(" to ");
  
    // Function to convert YYYY-MM-DD → DD-MM-YYYY
    const formatDate = (dateString) => {
      const [year, month, day] = dateString.split("-");
      return `${day}-${month}-${year}`;
    };
  
    return `${formatDate(startDate)} to ${formatDate(endDate)}`;
  };
  export const getRelativeTime = (timestamp) => {
    if (!timestamp) return "";
    const now = new Date();
    const created = new Date(timestamp);
    const diffMs = now - created;
    
    // Calculate minutes difference
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    if (diffMinutes < 1) {
      return "Just now";
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
    }
    
    // Calculate hours difference if it's at least one hour
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 24) {
      return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
    }
    
    // Calculate days difference for 24 hours or more
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  };
  
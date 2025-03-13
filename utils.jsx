export const getRelativeTime = (timestamp) => {
  if (!timestamp) return "";
  const now = new Date();
  const created = new Date(timestamp);
  const diffMs = now - created;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 24) {
    return diffHours <= 0
      ? "Just now"
      : `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  } else {
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  }
};

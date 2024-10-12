


function log_in(userId) {
  const loginTime = new Date().toISOString();
  console.log(`[->] UserId: ${userId}, Logged in at: ${loginTime}`);
}

module.exports = { log_in };


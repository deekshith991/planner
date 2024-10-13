


function log_in(userId) {
  const loginTime = new Date().toISOString();
  console.log(`[->] UserId: ${userId}, Logged in at: ${loginTime}`);
}

function Err_log(err, place) {

  console.log(`[-] Error @${place} \n${err}`);

}

function LOG(id, work, msg) {

  console.log(`[=] ${id} added ${work} & msg : "${msg}"`);
}

module.exports = { log_in, Err_log, LOG };

const fs = require("fs");
const path = require("path");
const glob = require("glob");
const cp = require("child_process");

module.exports = {
  name: "xcode",
  description: "Open xcode (workspace if it finds it, otherwise project",
  func: () => {
    const cwd = process.cwd();
    const iosdir = path.join(cwd, "ios");
    if (!fs.existsSync(iosdir)) {
      console.log("Did not find the iOS code in the expected location", iosdir);
      return;
    }
    const workspaceglob = path.join(iosdir, "*.xcworkspace");
    const wgs = glob.sync(workspaceglob);
    if (wgs && wgs.length) {
      cp.spawn("open", [wgs[0]]);
      console.log("Opening workspace", wgs[0]);
      return;
    }
    const projectglob = path.join(iosdir, "*.xcodeproj");
    const pgs = glob.sync(projectglob);
    if (pgs && pgs.length) {
      cp.spawn("open", [pgs[0]]);
      console.log("Opening project", pgs[0]);
      return;
    }
    console.log(
      "Could not find a workspace or a project to work with in",
      iosdir
    );
  }
};
//Check for ios directory

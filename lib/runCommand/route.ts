import { exec } from "child_process";

/**
 * Executes a shell command and returns a promise
 * @param {string} command - The command to run
 * @returns {Promise<string>} - The command's stdout
 */
export async function runCommand(command: string, input: string | null = null) {
    return new Promise<void>((resolve, reject) => {
        const childProcess = exec(command, { cwd: process.cwd() }, (error, stdout, stderr) => {
            if (error) {
              console.error(stderr);
              return reject(error);
            }
            resolve();
          });

          if (input) {
            childProcess.stdin?.write(input + '\n');
            childProcess.stdin?.end();
          }
  });
};

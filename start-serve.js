const { exec } = require('child_process');

console.log('Starting the server...');

const command = 'npx serve -s build -l 3001';
console.log(`Executing command: ${command}`);

exec(command, { cwd: './frondend' }, (error, stdout, stderr) => {
    console.log('Command execution started');
    if (error) {
        console.error('Error executing command:', error.message);
        console.error('Error details:', error);
        return;
    }
    if (stderr) {
        console.error('Stderr output:', stderr);
    }
    console.log('Stdout output:', stdout);
});

console.log('Server command executed');


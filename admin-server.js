#!/usr/bin/env node

/**
 * Simple Admin Server for Square Cuadrado
 * This server provides API endpoints to read and write JSON data files
 * Run with: node admin-server.js
 */

const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const url = require('url');

const PORT = 8889;
const PICKS_FILE = path.join(__dirname, 'data', 'picks.json');
const DETAILS_FILE = path.join(__dirname, 'data', 'picks-details.json');

// Helper function to send JSON response
function sendJSON(res, data, statusCode = 200) {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end(JSON.stringify(data));
}

// Helper function to serve static files
async function serveStatic(req, res) {
    let filePath = '.' + req.url;
    if (filePath === './') filePath = './index.html';
    
    const extname = path.extname(filePath).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.webp': 'image/webp',
        '.svg': 'image/svg+xml'
    };
    
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    
    try {
        const content = await fs.readFile(filePath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
    } catch (error) {
        if (error.code === 'ENOENT') {
            res.writeHead(404);
            res.end('File not found');
        } else {
            res.writeHead(500);
            res.end('Server error: ' + error.code);
        }
    }
}

// Parse JSON body from request
function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (e) {
                reject(e);
            }
        });
    });
}

// Create HTTP server
const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end();
        return;
    }
    
    // API Routes
    if (pathname === '/api/picks' && req.method === 'GET') {
        // Get all picks
        try {
            const data = await fs.readFile(PICKS_FILE, 'utf-8');
            sendJSON(res, JSON.parse(data));
        } catch (error) {
            sendJSON(res, { error: 'Failed to read picks' }, 500);
        }
    }
    else if (pathname === '/api/picks-details' && req.method === 'GET') {
        // Get all pick details
        try {
            const data = await fs.readFile(DETAILS_FILE, 'utf-8');
            sendJSON(res, JSON.parse(data));
        } catch (error) {
            sendJSON(res, { error: 'Failed to read details' }, 500);
        }
    }
    else if (pathname === '/api/pick' && req.method === 'PUT') {
        // Update a single pick
        try {
            const body = await parseBody(req);
            const { id, data: pickData, details } = body;
            
            if (!id) {
                sendJSON(res, { error: 'ID required' }, 400);
                return;
            }
            
            // Update picks.json if basic data provided
            if (pickData) {
                const picksContent = await fs.readFile(PICKS_FILE, 'utf-8');
                const picks = JSON.parse(picksContent);
                const index = picks.picks.findIndex(p => p.id === id);
                
                if (index !== -1) {
                    picks.picks[index] = { ...picks.picks[index], ...pickData };
                    picks.lastUpdated = new Date().toISOString().split('T')[0];
                    await fs.writeFile(PICKS_FILE, JSON.stringify(picks, null, 2));
                }
            }
            
            // Update picks-details.json if details provided
            if (details) {
                const detailsContent = await fs.readFile(DETAILS_FILE, 'utf-8');
                const allDetails = JSON.parse(detailsContent);
                allDetails[id] = { ...allDetails[id], ...details, customContent: true };
                await fs.writeFile(DETAILS_FILE, JSON.stringify(allDetails, null, 2));
            }
            
            sendJSON(res, { success: true, id });
        } catch (error) {
            console.error('Error updating pick:', error);
            sendJSON(res, { error: 'Failed to update pick' }, 500);
        }
    }
    else if (pathname === '/api/pick' && req.method === 'POST') {
        // Create a new pick
        try {
            const body = await parseBody(req);
            const { data: pickData, details } = body;
            
            if (!pickData || !pickData.id) {
                sendJSON(res, { error: 'Pick data with ID required' }, 400);
                return;
            }
            
            // Add to picks.json
            const picksContent = await fs.readFile(PICKS_FILE, 'utf-8');
            const picks = JSON.parse(picksContent);
            picks.picks.push(pickData);
            picks.lastUpdated = new Date().toISOString().split('T')[0];
            await fs.writeFile(PICKS_FILE, JSON.stringify(picks, null, 2));
            
            // Add to picks-details.json if details provided
            if (details) {
                const detailsContent = await fs.readFile(DETAILS_FILE, 'utf-8');
                const allDetails = JSON.parse(detailsContent);
                allDetails[pickData.id] = { ...details, customContent: true };
                await fs.writeFile(DETAILS_FILE, JSON.stringify(allDetails, null, 2));
            }
            
            sendJSON(res, { success: true, id: pickData.id });
        } catch (error) {
            console.error('Error creating pick:', error);
            sendJSON(res, { error: 'Failed to create pick' }, 500);
        }
    }
    else if (pathname.startsWith('/api/pick/') && req.method === 'DELETE') {
        // Delete a pick
        try {
            const id = pathname.split('/')[3];
            
            // Remove from picks.json
            const picksContent = await fs.readFile(PICKS_FILE, 'utf-8');
            const picks = JSON.parse(picksContent);
            picks.picks = picks.picks.filter(p => p.id !== id);
            picks.lastUpdated = new Date().toISOString().split('T')[0];
            await fs.writeFile(PICKS_FILE, JSON.stringify(picks, null, 2));
            
            // Remove from picks-details.json
            const detailsContent = await fs.readFile(DETAILS_FILE, 'utf-8');
            const allDetails = JSON.parse(detailsContent);
            delete allDetails[id];
            await fs.writeFile(DETAILS_FILE, JSON.stringify(allDetails, null, 2));
            
            sendJSON(res, { success: true, id });
        } catch (error) {
            console.error('Error deleting pick:', error);
            sendJSON(res, { error: 'Failed to delete pick' }, 500);
        }
    }
    else {
        // Serve static files
        await serveStatic(req, res);
    }
});

// Start server
server.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════╗
║     Square Cuadrado Admin Server Running!         ║
╠════════════════════════════════════════════════════╣
║                                                    ║
║  Admin Dashboard: http://localhost:${PORT}/admin/    ║
║  API Endpoints:   http://localhost:${PORT}/api/      ║
║                                                    ║
║  Press Ctrl+C to stop the server                  ║
╚════════════════════════════════════════════════════╝
    `);
});

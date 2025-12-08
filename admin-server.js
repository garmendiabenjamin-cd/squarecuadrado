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
const crypto = require('crypto');

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
    let filePath = '.' + req.url.split('?')[0]; // Remove query parameters
    
    // Default redirects for common admin paths
    if (filePath === './admin' || filePath === './admin/') {
        res.writeHead(302, { 'Location': '/admin/dashboard.html' });
        res.end();
        return;
    }
    
    // Default to index.html for root
    if (filePath === './') filePath = './index.html';
    
    // Check if path is a directory and try to serve appropriate file
    try {
        const stat = await fs.stat(filePath);
        if (stat.isDirectory()) {
            // For admin directory, serve dashboard.html
            if (filePath.includes('/admin')) {
                const dashboardPath = path.join(filePath, 'dashboard.html');
                try {
                    await fs.stat(dashboardPath);
                    filePath = dashboardPath;
                } catch {
                    // Dashboard doesn't exist, try index.html
                    const indexPath = path.join(filePath, 'index.html');
                    try {
                        await fs.stat(indexPath);
                        filePath = indexPath;
                    } catch {
                        res.writeHead(404);
                        res.end('No dashboard.html or index.html found in admin directory');
                        return;
                    }
                }
            } else {
                // For other directories, try index.html
                const indexPath = path.join(filePath, 'index.html');
                try {
                    await fs.stat(indexPath);
                    filePath = indexPath;
                } catch {
                    res.writeHead(403);
                    res.end('Directory listing not allowed');
                    return;
                }
            }
        }
    } catch {
        // File doesn't exist yet, will be handled below
    }
    
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
        '.svg': 'image/svg+xml',
        '.mov': 'video/quicktime',
        '.mp4': 'video/mp4'
    };
    
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    
    try {
        const content = await fs.readFile(filePath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    } catch (error) {
        if (error.code === 'ENOENT') {
            res.writeHead(404);
            res.end('File not found');
        } else if (error.code === 'EISDIR') {
            res.writeHead(403);
            res.end('Cannot serve directory');
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
    if (pathname === '/api/upload' && req.method === 'POST') {
        // Handle image upload
        let body = Buffer.alloc(0);
        
        req.on('data', chunk => {
            body = Buffer.concat([body, chunk]);
        });
        
        req.on('end', async () => {
            try {
                // Parse multipart form data (simple implementation)
                const boundary = req.headers['content-type'].split('boundary=')[1];
                const parts = body.toString('binary').split('--' + boundary);
                
                let imageData = null;
                let filename = null;
                let uploadType = 'gallery';
                
                for (const part of parts) {
                    if (part.includes('Content-Disposition: form-data')) {
                        if (part.includes('name="image"')) {
                            // Extract filename
                            const filenameMatch = part.match(/filename="([^"]+)"/);
                            if (filenameMatch) {
                                const originalName = filenameMatch[1];
                                const ext = path.extname(originalName).toLowerCase();
                                
                                // Generate unique filename
                                const timestamp = Date.now();
                                const hash = crypto.randomBytes(4).toString('hex');
                                filename = `${timestamp}-${hash}${ext}`;
                            }
                            
                            // Extract binary data
                            const dataStart = part.indexOf('\r\n\r\n') + 4;
                            const dataEnd = part.lastIndexOf('\r\n');
                            if (dataStart > 3 && dataEnd > dataStart) {
                                imageData = Buffer.from(part.substring(dataStart, dataEnd), 'binary');
                            }
                        } else if (part.includes('name="type"')) {
                            const typeMatch = part.match(/\r\n\r\n([^\r\n]+)/);
                            if (typeMatch) {
                                uploadType = typeMatch[1].trim();
                            }
                        }
                    }
                }
                
                if (imageData && filename) {
                    // Determine folder based on type
                    const folder = uploadType === 'hero' ? 'images/hotels' : 'images/recommendations';
                    const uploadDir = path.join(__dirname, folder);
                    
                    // Ensure directory exists
                    try {
                        await fs.mkdir(uploadDir, { recursive: true });
                    } catch (e) {
                        // Directory might already exist
                    }
                    
                    // Save file
                    const filepath = path.join(uploadDir, filename);
                    await fs.writeFile(filepath, imageData);
                    
                    // Return the relative path
                    const relativePath = `${folder}/${filename}`;
                    
                    sendJSON(res, { 
                        success: true, 
                        path: relativePath,
                        filename: filename 
                    });
                } else {
                    sendJSON(res, { error: 'No image data received' }, 400);
                }
            } catch (error) {
                console.error('Upload error:', error);
                sendJSON(res, { error: 'Failed to upload image: ' + error.message }, 500);
            }
        });
        return;
    }
    else if (pathname === '/api/picks' && req.method === 'GET') {
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

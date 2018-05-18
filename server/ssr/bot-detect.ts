import * as express from 'express';
import * as path from 'path';
import * as urlLib from 'url';
import * as fs from 'fs';
import fetch from 'node-fetch';
import { APP_URL, APP_ROOT_URL, RENDER_URL, CACHE_CONTROL_VALUE } from '../constants';

// Bot detect
export const detectBot = (userAgent: string): boolean => {
    const bots = [
        'googlebot',
        'bingbot',
        'yandexbot',
        'duckduckbot',
        'slurp',
        'baiduspider',
        'ia_archiver',
        'twitterbot',
        'facebookexternalhit',
        'facebot',
        'linkedinbot',
        'embedly',
        'baiduspider',
        'pinterest',
        'slackbot',
        'vkShare',
        'facebot',
        'outbrain',
        'W3C_Validator',
        'screaming frog seo spider',
        'pingdom.com_bot_version_1.4_(http://www.pingdom.com/)',
        'google-structured-data-testing-tool'
    ];

    const agent = userAgent.toLowerCase();

    for (const bot of bots) {
        if (agent.indexOf(bot) > -1) {
            console.log(`${new Date()} | Bots Detected | Bot: ${bot} | User Agent: ${agent}`);
            return true;
        }
    }
    console.log(`${new Date()} | No Bots Detected | User Agent: ${agent}`);
    return false;
};

const generateUrl = (req: express.Request): string => {
    return urlLib.format({
        protocol: 'https',
        host: APP_URL,
        pathname: req.originalUrl
    });
};

export const processURL = (request: express.Request, response: express.Response) => {
    const isBot = detectBot(request.headers['user-agent'] as string);
    const genratedUrl = generateUrl(request);
    if (isBot) {
        console.log(`Rendering: ${RENDER_URL}/${genratedUrl}`);
        // If Bot, fetch url via rendertron
        fetch(`${RENDER_URL}/${genratedUrl}`)
            .then(res => res.text())
            .then(body => {
                // Set the Vary header to cache the user agent, based on code from:
                response.set('Cache-Control', CACHE_CONTROL_VALUE);
                response.set('Vary', 'User-Agent');
                response.send(body.toString());
            })
            .catch(error => {
                console.log('!Error While Rendering URL: ', error);
            });
    } else {
        // Not a bot, fetch the regular Angular app
        fetch(APP_URL)
            .then(res => res.text())
            .then(body => {
                response.send(body.toString());
            })
            .catch(error => {
                console.log('ERROR While Fetching URL: ', error);
            });
    }
};

import * as express from 'express';
import * as path from 'path';
import * as urlLib from 'url';
import * as fs from 'fs';
import fetch from 'node-fetch';
import { APP_URL, RENDER_URL, CACHE_CONTROL_VALUE } from '../constants';

// Bot detect
export const detectBot = (userAgent: string): boolean => {
    // List of bots to target, add more if you'd like
    // const bots = [
    //     // crawler bots
    //     'googlebot',
    //     'bingbot',
    //     'yandexbot',
    //     'duckduckbot',
    //     'slurp',
    //     // link bots
    //     'twitterbot',
    //     'facebookexternalhit',
    //     'linkedinbot',
    //     'embedly',
    //     'baiduspider',
    //     'pinterest',
    //     'slackbot',
    //     'vkShare',
    //     'facebot',
    //     'outbrain',
    //     'W3C_Validator'
    // ];

    // const agent = userAgent.toLowerCase();

    // for (const bot of bots) {
    //     if (agent.indexOf(bot) > -1) {
    //         console.log('bot detected', bot, agent);
    //         return true;
    //     }
    // }
    // console.log('no bots found');
    return false;
};

const generateUrl = (req: express.Request): string => {
    return urlLib.format({
        protocol: req.protocol,
        host: APP_URL,
        pathname: req.originalUrl
    });
};

export const processURL = (request: express.Request, response: express.Response) => {
    const isBot = detectBot(request.headers['user-agent'] as string);
    const genratedUrl = generateUrl(request);
    if (isBot) {
        // If Bot, fetch url via rendertron
        fetch(`${RENDER_URL}/${genratedUrl}`).then(res => res.text())
            .then(body => {
                // Set the Vary header to cache the user agent, based on code from:
                response.set('Cache-Control', CACHE_CONTROL_VALUE);
                response.set('Vary', 'User-Agent');
                response.send(body.toString());
            });
    } else {
        // Not a bot, fetch the regular Angular app
        // fetch(`https://${APP_URL}`) // PROD
        fetch(`${APP_URL}`) // DEV
            .then(res => res.text())
            .then(body => {
                response.send(body.toString());
            });
    }
};

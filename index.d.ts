interface commandReturn { 
    code: number,
    result: number, 
    data: string 
}

interface agiChannel {
    on: (action: string, callback: any) => void,
    answer: () => PromiseLike<commandReturn>,
    close: () => void,
    status: () => PromiseLike<commandReturn>,
    hangup: () => PromiseLike<commandReturn>,
    sayAlpha: (text: string, escapeDigits: string) => PromiseLike<commandReturn>,
    sayDate: (time: Date, escapeDigits: string) => PromiseLike<commandReturn>,
    sayDateTime: (time: Date, escapeDigits: string, format: string, timeZone: string) => PromiseLike<commandReturn>,
    sayDigits: (number: number, escapeDigits: string) => PromiseLike<commandReturn>,
    sayNumber: (number: number, escapeDigits?: string, gender?: string) => PromiseLike<commandReturn>,
    sayTime: (time: Date | number, escapeDigits: string) => PromiseLike<commandReturn>,
    getData: (prompt: string, timeout: number, maxDigits: number) => PromiseLike<commandReturn>, 
    playFile: (prompt: string, escapeDigits: string) => PromiseLike<commandReturn>,
    setVariable: (name: string, value: string | number) => PromiseLike<commandReturn>,
    getVariable: (name: string) => PromiseLike<commandReturn>,
    exec: (application: string, option: string) => PromiseLike<commandReturn>,
    verbose: (message: string, level: number | string) => PromiseLike<commandReturn>,
    waitDigit: (timeout: number) => PromiseLike<commandReturn>,
    command: (command: string) => PromiseLike<commandReturn>,
    channelData: {
        agi_network_script: string,
        agi_request: string,
        agi_channel: string,
        agi_language: string,
        agi_type: string,
        agi_uniqueid: string,
        agi_version: string,
        agi_callerid: string,
        agi_calleridname: string,
        agi_callingpres: string,
        agi_callingani2: string,
        agi_callington: string,
        agi_callingtns: string,
        agi_dnid: string,
        agi_rdnis: string,
        agi_context: string,
        agi_extension: string,
        agi_priority: string,
        agi_enhanced: string,
        agi_accountcode: string, 
        agi_threadid: string,
    },
    params: any
}

declare module 'fastagi.io' {
    function createApplication(): {
        agi: (path: string, callback: (channel: agiChannel) => void) => void,
        listen: (port: number, callback: any) => any
    }

    function parseParams(searchParams: string): any

    export = createApplication
}

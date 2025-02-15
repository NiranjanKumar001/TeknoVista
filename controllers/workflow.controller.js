import { createRequire} from 'module';

//using ES Modules (import and export) in your project, but @upstash/workflow/express is likely using CommonJS syntax (require and module.exports).

const require = createRequire(import.meta.url);

const { serve } = require('@upstash/workflow/express');

export const sendReminders= serve()


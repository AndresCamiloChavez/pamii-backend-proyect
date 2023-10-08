export interface EmailContent{
    to: string;
    subject: string;
    text?: string;
    html: string;
}
import expresss, {Request, Response} from 'express';

const app = expresss();

app.use(expresss.json());

/**
 * Format the server's local time in "hh:mm:ss GMT+hh:ss".
 */
function getFormattedServerTime(): string {
    const now = new Date();

    // Hours, minutes, seconds
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    // Timezone offset in minutes (negative if UTC is behind local time)
    const offsetMinutes = -now.getTimezoneOffset();
    const sign = offsetMinutes >= 0 ? "+" : "-";
    const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
    const offsetMins = Math.floor(Math.abs(offsetMinutes) % 60);

    // Format e.g. "GMT+02:00"
    const gmtString = `GMT${sign}${String(offsetHours).padStart(2, "0")}:${String(offsetMins).padStart(2, "0")}`;

    return `${hours}:${minutes}:${seconds} ${gmtString}`;
}

/**
 * 1. /server-ip
 *    Returns the server's IP address in JSON.
 */
app.get("/server-ip", (req: Request, res: Response) => {
    const serverIp = "35.183.155.159";
    res.json({ serverIp });
});

/**
 * 2. /server-time
 *    Returns server local time, at the time of API call, in "hh:mm:ss GMT+hh:ss" format.
 */
app.get("/server-time", (req: Request, res: Response) => {
    const serverTime = getFormattedServerTime();
    res.json({ serverTime });
});

/**
 * 3. /my-name
 *    Returns your first and last name.
 */
app.get("/my-name", (req: Request, res: Response) => {
    res.json({
        firstName: "Anthony",
        lastName: "Ji",
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})
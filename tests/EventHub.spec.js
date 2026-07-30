import { expect, test } from '@playwright/test'

const baseUrl = 'https://eventhub.rahulshettyacademy.com';
const userEmail = 'anon123@gmail.com';
const userPassword = 'Test@123';

function setEventDate(daysToEvent = 7) {

    const eventDate = new Date();
    eventDate.setDate(eventDate.getDate() + daysToEvent);
    const year = String(eventDate.getFullYear()).padStart(6, '0');
    const month = String(eventDate.getMonth() + 1).padStart(2, '0');
    const day = String(eventDate.getDate()).padStart(2, '0');
    // console.log(year);
    const hours = "18";
    const minutes = "00";

    return `${day}-${month}-${year}T${hours}:${minutes}`;
}
async function loginFunction(page) {

    // const context = await browser.newContext();
    // const page = await context.newPage();

    await page.goto(`${baseUrl}/login`);

    const login = page.getByPlaceholder("you@email.com");
    const password = page.getByLabel("Password");
    const signin = page.locator("#login-btn");


    await login.fill(userEmail);
    await password.fill(userPassword);
    await signin.click();

    await page.waitForLoadState("networkidle");
    await page.locator("div h1").waitFor();

    await expect(page.getByRole("link", { name: 'Browse Events →' })).toBeVisible();

}

async function getSeatCount(eventCard) {

    const seatElement = await eventCard.getByText(/seat/i).first(); //.first()
    const seatText = await seatElement.innerText();

    const seatCount = parseInt(seatText.match(/\d+/)// \d checks digit + checks if multiple digits are present
        ?.[0]//this is contitional statement if digit is not null then return digits as first element of array
        || '0' //this is or if digit null then return 0
        , 10); //this will parse text into decimal format

    return seatCount;


}

test('Create Event', async ({ page }) => {

    await loginFunction(page);

    const admin = page.getByText("Admin");
    const eventTitle = `Test Event ${Date.now()}`;

    await admin.click();
    const waitObject = await page.getByText('Manage EventsManage Bookings');
    // await waitObject.waitFor();
    // await page.getByRole('button', { name: 'Admin' }).click();
    await waitObject.getByRole('link', { name: 'Manage Events' }).click();
    await page.getByPlaceholder("Event Title").fill(eventTitle);
    await page.locator('textarea').fill("This is the description");

    await page.getByLabel('City').fill("Random place on earth");
    await page.getByLabel('Venue').fill("Dev Bhoomi uttarakhand");
    await page.getByLabel('Event Date & Time').pressSequentially(setEventDate());
    await page.getByLabel('Price ($)').fill('100');
    await page.getByLabel('Total Seats').fill('50');
    await page.locator('#add-event-btn').click();

    await expect(page.getByText('Event created!')).toBeVisible();

    await page.goto(`${baseUrl}/events`);

    const eventCards = await page.getByTestId('event-card');

    await expect(eventCards.first()).toBeVisible();

    const matchingCard = eventCards.filter({ hasText: `${eventTitle}` });

    await expect(matchingCard).toBeVisible({ timeout: 5000, });

    const seatsBeforeBooking = await getSeatCount(matchingCard);

    console.log("Seat count before booking is: " + seatsBeforeBooking);

    await matchingCard.getByTestId('book-now-btn').click();

    await expect(page.locator('#ticket-count')).toHaveText('1');

    const bookingName = await page.getByLabel('Full Name');
    await bookingName.fill("Anon Test");

    const bookingEmail = await page.locator('#customer-email');
    await bookingEmail.fill('test@mail.com');

    const bookingContact = await page.getByPlaceholder('+91 98765 43210');
    await bookingContact.fill('1234567890');

    await page.locator('.confirm-booking-btn').click();

    const bookingId = await page.locator('.booking-ref');
    await expect(bookingId).toBeVisible();
    const bookingRef = (await bookingId.innerText()).trim();

    console.log("the Booking Reference Id is: "+ bookingRef);

    await page.getByRole('button', { name: /My Bookings/i }).click();

    await page.waitForLoadState('networkidle');
    const pageTitle = await page.url();
    await expect(pageTitle).toContain(`${baseUrl}/bookings`);

    const bookingCards = page.getByTestId('booking-card');
    await (bookingCards.first()).waitFor();
    const myEventCard = bookingCards.filter({ hasText: `${bookingRef}` });
    await expect(myEventCard).toBeVisible();

    const myCardName = await myEventCard.locator('div h3').textContent();
    console.log("title on page - "+ myCardName + " " + "title we selected - " + eventTitle);
    await expect(myCardName).toContain(`${eventTitle}`);


    await page.goto(`${baseUrl}/events`);

    await expect(eventCards.first()).toBeVisible();
    
    await expect(matchingCard).toBeVisible();
    const seatsAfterBooking = await getSeatCount(matchingCard);

    await expect(seatsAfterBooking === seatsBeforeBooking-1).toBeTruthy();



});

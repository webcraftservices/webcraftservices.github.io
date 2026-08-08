/**
 * Sends a form submission to Formspree so inquiries land in your inbox.
 *
 * Setup (one-time):
 * 1. Create a free account at https://formspree.io
 * 2. Create a new form and set the notification email to the address
 *    where you want to receive inquiries.
 * 3. Copy the form's endpoint (looks like https://formspree.io/f/xxxxxxxx)
 *    into VITE_FORMSPREE_ENDPOINT in your .env file (see .env.example).
 * 4. Restart the dev server / rebuild so Vite picks up the new env var.
 */

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as
  | string
  | undefined;

export class InquirySubmissionError extends Error {}

/**
 * Submits arbitrary form data as JSON to the configured Formspree endpoint.
 * Throws InquirySubmissionError with a user-friendly message on any failure,
 * including when the endpoint hasn't been configured yet.
 */
export async function submitInquiry(
  data: Record<string, string | undefined>,
): Promise<void> {
  if (!FORMSPREE_ENDPOINT) {
    // Fails loudly in dev so misconfiguration is obvious; the caller
    // shows a friendly toast either way.
    console.error(
      'VITE_FORMSPREE_ENDPOINT is not set. Add it to your .env file — see .env.example.',
    );
    throw new InquirySubmissionError(
      "This form isn't fully set up yet. Please try again later or reach out directly.",
    );
  }

  let response: Response;
  try {
    response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch {
    throw new InquirySubmissionError(
      'Network error — please check your connection and try again.',
    );
  }

  if (response.ok) {
    return;
  }

  // Formspree returns { errors: [{ message: string }] } on failure.
  let message =
    'Something went wrong sending your message. Please try again.';
  try {
    const body = await response.json();
    if (Array.isArray(body?.errors) && body.errors[0]?.message) {
      message = body.errors.map((e: { message: string }) => e.message).join(' ');
    }
  } catch {
    // Ignore parse failures, use default message.
  }

  throw new InquirySubmissionError(message);
}

export type BookingLinkLocation = "reservation_page" | "booking_modal";
type RoomName = "yeoyu" | "yeohaeng";

// A click is interest in booking, not a completed reservation. Only bounded,
// non-personal labels are sent; never include page queries or guest details.
export function trackAirbnbBookingClick(roomName: RoomName, linkLocation: BookingLinkLocation) {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "airbnb_booking_click", {
        room_name: roomName,
        link_location: linkLocation,
        transport_type: "beacon",
      });
    }
  } catch {
    // Analytics is best effort: never interrupt normal anchor navigation.
  }
}

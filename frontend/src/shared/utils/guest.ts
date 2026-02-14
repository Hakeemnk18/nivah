import { v4 as uuid } from "uuid";

export function getGuestId() {
  let guestId = localStorage.getItem("guestId");

  if (!guestId) {
    guestId = uuid();
    localStorage.setItem("guestId", guestId);
  }

  return guestId;
}
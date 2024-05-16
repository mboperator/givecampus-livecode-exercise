import {collectDonations, designationsFromDonations} from "../designations";

describe('Designations Accumulator', () => {
  describe('collectDonations', () => {
    it('should read all the donations in', async () => {
      const donations = await collectDonations();
      expect(donations.length).toBe(13)
    })
  })

  describe('designationsFromDonations', () => {
    it('have a row for each unique designation', async () => {
      const designations = await designationsFromDonations();
      expect(designations.length).toBe(7);
    });
  })
})

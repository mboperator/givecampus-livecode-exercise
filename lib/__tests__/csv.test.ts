import {load} from "../csv";
describe('CSV importer', () => {
  it('should return an array of objects', async () => {
    const result = await load('/data.csv');
    expect(result.length).toBe(2)
  });
  it('should return objects that have the appropriate keys', async () => {
    const result = await load('/data.csv');
    expect(Object.keys(result[0])).toEqual(['donor', 'donation_amount', 'campaign_id'])
  });
})

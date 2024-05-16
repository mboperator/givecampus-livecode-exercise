import {load} from "./csv";

function formatOnlineDonations(donations: any[]) {
  return donations.reduce((denormalizedDonations: any[], donation: any) => {
    const stringDesig = donation.designation;
    const designations = JSON.parse(stringDesig);
    const designationNames = Object.keys(designations);
    if (designationNames.length === 0) {
      return denormalizedDonations.concat({
        ...donation,
        amount: Number(donation.amount),
        designation_name: '',
      });
    }
    const newDonations = designationNames.map(name => ({
      name: donation.name,
      email: donation.email,
      designation_name: name,
      amount: Number(designations[name]),
    }))
    return denormalizedDonations.concat(newDonations);
  }, [])
}

export async function collectDonations(): Promise<any[]> {
  const [offline, online] = await Promise.all([
    load('/offline_donations.csv'),
    load('/online_donations.csv')
  ])
  const formattedOfflineDonations = offline.map(o => ({ ...o, amount: Number(o.amount) }))
  const formattedOnlineDonations = formatOnlineDonations(online);
  return formattedOfflineDonations.concat(formattedOnlineDonations);
}

type OfflineDonation = {
  name: string;
  email: string;
  amount: number;
  affiliation: string;
  designation_name: string;
  designated_amount: number;
}

type OnlineDonation = {
  name: string;
  email: string;
  amount: number;
  affiliation: Record<string, any>;
  designation: Record<string, any>;
}

function pluckDesignation(donation: any) {
  return donation.designation_name
}

export async function designationsFromDonations(): Promise<any[]> {
  const donations = await collectDonations()

  const designations = donations.reduce((designations, donation) => {
    const designation = pluckDesignation(donation);
    if (designations[designation]) {
      if (!designations[designation].donorNames.includes(donation.name)) {
        designations[designation].donors ++;
        designations[designation].donorNames.push(donation.name);
      }
      designations[designation].amount += donation.amount;
    } else {
      designations[designation] = {
        donors: 1,
        amount: donation.amount,
        donorNames: [donation.name],
      }
    }
    return designations;
  }, {})

  return designations
}

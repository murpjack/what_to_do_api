/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import { HospitalityVenue } from '../../src/types/hospitality_venues';

export const randomBool = () => Math.random() < 0.5;

export const randomApprovalStatus = (override?: number) => {
  const randomNumber = override || Math.random();
  if (randomNumber < 0.33) {
    return 'APPROVED';
  }
  if (randomNumber < 0.66) {
    return 'PENDING';
  }
  // if (randomNumber <= 1) {
  return 'REJECTED';
  // }
};

export const randomFloat = (min = 1, max = 10, decimals = 2) => {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);

  return parseFloat(str);
};

export const randomString = (length: number) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * charactersLength),
    );
  }

  return result;
};

export const randomVenue = (): HospitalityVenue => ({
  // Venue approvalStatus MUST be PENDING on create
  approvalStatus: randomApprovalStatus(0.5),
  costOfCokeOrSimilar: randomFloat(),
  description: faker.lorem.paragraph(),
  email: faker.internet.email(),
  foodMenuUrl: faker.internet.domainName(),
  hasGlutenFreeOptions: randomBool(),
  hasVeganOptions: randomBool(),
  hasWheelchairAccess: randomBool(),
  hasBabyChangingFacilities: randomBool(),
  // 'gcqfjs7' = Somewhere in Cov centre
  locationHash: 'gcqfjs7' + randomString(2),
  telephone: faker.phone.number(),
  venueId: 'TEST' + faker.datatype.uuid(),
  venueName: faker.company.name(),
});

/**
    Before each 
        empty DB table
        
    Create a venue
        1 should create a new entry w correct properties
          Get Venues to confirm new entry is added
        
        2 if not, should return an error
        

    Update a venue
        1 should update an existing entry w selected properties
          Get venue to confirm only changes made

        2 if not, should return an error

        3 if updating approvalStatus, must have relevant permissions
          Get venue to confirm changes reflect permissions
        a. has permissions, changes success
        b. hasn't permission, no changes & show error


    Delete a venue
        Seed DB
        1 delete value
        Get Venues to confirm new entry has been deleted

 */

context('Get venues (GET) /api/hospitality/venues', () => {
  // Manage HTTP requests in your app
  beforeEach(() => {
    cy.visit('/');
    // TODO get current values from table
    // TODO then -> delete all current values from table
  });

  it('Call body contains data list', () => {
    cy.request(`/api/hospitality/venues`).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data').to.not.be
        .undefined;
    });
  });
});

context('Create venues (POST) /api/hospitality/venues', () => {
  // Manage HTTP requests in your app
  beforeEach(() => {
    cy.visit('/');
    // TODO get current values from table
    // TODO then -> delete all current values from table
    // TODO then -> seed table
  });

  it('Venues created', () => {
    cy.request({
      method: 'POST',
      url: `/api/hospitality/venues`,
      body: {
        venues: [randomVenue(), randomVenue()],
      },
    }).should((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('data');
    });
  });

  it('Venues MUST have "PENDING" approvalStatus on create', () => {
    cy.request({
      method: 'POST',
      url: `/api/hospitality/venues`,
      body: {
        venues: [
          {
            ...randomVenue(),
            approvalStatus: randomApprovalStatus(1),
          },
        ],
      },
      failOnStatusCode: false,
    }).should((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error');
    });
  });
});

context('Update venues (PUT) /api/hospitality/venues', () => {});

context('Delete venues (DELETE) /api/hospitality/venues', () => {});

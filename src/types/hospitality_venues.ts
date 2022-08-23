export interface HospitalityVenues {
    hospitality_venues: HospitalityVenue[];
}

export interface HospitalityVenue {
    approvalStatus:            string;
    costOfCokeOrSimilar:       number;
    description:               string;
    email:                     string;
    foodMenuUrl:               string;
    hasGlutenFreeOptions:      boolean;
    hasVeganOptions:           boolean;
    hasWheelchairAccess:       boolean;
    hasBabyChangingFacilities: boolean;
    locationHash:              string;
    telephone:                 string;
    venueName:                 string;
}

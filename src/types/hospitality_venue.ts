export interface HospitalityVenue {
    hospitality_venue: HospitalityVenueClass;
}

export interface HospitalityVenueClass {
    venueId:                   string;
    venueName:                 string;
    venueType:                 string;
    approvalStatus:            string;
    locationGeohash:           string;
    description:               string;
    costOfCokeOrSimilar:       string;
    telephone:                 string;
    email:                     string;
    foodMenuUrl:               string;
    hasGlutenFreeOptions:      boolean;
    hasVeganOptions:           boolean;
    hasWheelchairAccess:       boolean;
    hasBabyChangingFacilities: boolean;
}

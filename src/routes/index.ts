import express from 'express';
import * as h from '../controllers/hospitality';
import corsOptions from '../cross-origin';
const router = express.Router();

router.use(corsOptions);

router.post(`/hospitality/venues`, h.createVenue);
router.get(`/hospitality/venues`, h.getVenues);
router.get(`/hospitality/venues/:venueId`, h.getVenueById);
router.put(`/hospitality/venues`, h.updateVenue);
router.delete(`/hospitality/venues/:venueId`, h.deleteVenue);

export default router;

import { Router } from 'express';
import { createUser, deleteFootprint, fetchAlertsNearBy10KM, getFootprint, getUserDetails, initializeJourney, loginUser, setFootprint, triggerAlert, updateRecentLocation, updateTrustedContacts } from '../controller/user.controller.js';

const router = Router();

router.route('/signup').post(createUser);
router.route('/login').post(loginUser);
router.route('/get').post(getUserDetails);
router.route('/update').post(updateTrustedContacts);
router.route('/update-recent-location').post(updateRecentLocation);


router.route('/trigger-alert').post(triggerAlert);
router.route('/fetch-alerts').post(fetchAlertsNearBy10KM);

router.route('/initialize-journey').post(initializeJourney);
router.route('/set-footprint').post(setFootprint);
router.route('/get-footprint').get(getFootprint);
router.route('/delete-footprint').post(deleteFootprint);


export default router;

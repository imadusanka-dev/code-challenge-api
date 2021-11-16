import express from "express";
import searchController from "./controllers/SearchController";
const router = express.Router();

router.get('/organizations', searchController.searchOrganizations);
router.get('/tickets', searchController.searchTickets);
router.get('/users', searchController.searchUsers);

export default router;
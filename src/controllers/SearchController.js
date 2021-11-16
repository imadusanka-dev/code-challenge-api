import searchService from "../services/SearchService";

class SearchController {
  async searchOrganizations(req, res) {
    try {
      const field = req?.query?.field;
      const searchValue = req?.query?.value;

      const organizations = searchService.findOrganizations(field, searchValue);
      res.status(200).send(organizations);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }

  async searchTickets(req, res) {
    try {
      const field = req?.query?.field;
      const searchValue = req?.query?.value;

      const tickets = searchService.findTickets(field, searchValue);
      res.status(200).send(tickets);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }

  async searchUsers(req, res) {
    try {
      const field = req?.query?.field;
      const searchValue = req?.query?.value;

      const users = searchService.findUsers(field, searchValue);
      res.status(200).send(users);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
}

const searchController = new SearchController();
export default searchController;
import MiniSearch from 'minisearch'

const Organizations = require("../data/organizations.json");
const Tickets = require("../data/tickets.json");
const Users = require("../data/users.json");

class SearchService {

  constructor() {
    this._organizations = new MiniSearch({
      fields: [
        "_id",
        "url",
        "external_id",
        "name",
        "domain_names",
        "created_at",
        "details",
        "shared_tickets",
        "tags"],
      storeFields: ["_id", "name"],
      tokenize: (string, _fieldName) => string.split(','),
      idField: "_id"
    });

    this._tickets = new MiniSearch({
      fields: [
        "_id",
        "url",
        "external_id",
        "created_at",
        "type",
        "subject",
        "description",
        "priority",
        "status",
        "submitter_id",
        "assignee_id",
        "organization_id",
        "tags",
        "has_incidents",
        "due_at",
        "via"],
      storeFields: ["_id", "subject", "submitter_id", "assignee_id", "organization_id",],
      tokenize: (string, _fieldName) => string.split(','),
      idField: "_id"
    });

    this._users = new MiniSearch({
      fields: [
        "_id",
        "url",
        "external_id",
        "name",
        "alias",
        "created_at",
        "active",
        "verified",
        "shared",
        "locale",
        "timezone",
        "last_login_at",
        "email",
        "phone",
        "signature",
        "organization_id",
        "tags",
        "suspended",
        "role"],
      storeFields: ["_id", "organization_id", "name"],
      tokenize: (string, _fieldName) => string.split(','),
      idField: "_id"
    });

    // Index all documents
    this._organizations.addAll(Organizations);
    this._tickets.addAll(Tickets);
    this._users.addAll(Users);

  }

  findOrganizations(field, value) {
    try {
      const organizations = this._organizations.search(value.toString(), { fields: [field] });
      for (const organization of organizations) {
        //get users
        organization.users = this._users.search(organization._id?.toString(), {fields: ["organization_id"]});

        //get tickets
        organization.tickets = this._tickets.search(organization._id?.toString(), { fields: ["organization_id"]});
      }

      return organizations;
    } catch (e) {
      throw new Error("Error while searching organizations");
    }
  }

  findTickets(field, value) {
    try {
      const tickets = this._tickets.search(value, { fields: [field] });

      for (const ticket of tickets) {
        //get assignee
        ticket.assignee = this._users.search(ticket.assignee_id?.toString(), { fields: ["_id"]})[0]?.name;

        //get submitter
        ticket.submitter = this._users.search(ticket.submitter_id?.toString(), { fields: ["_id"]})[0]?.name;

        //get organization
        ticket.organization = this._organizations.search(ticket.organization_id?.toString(), { fields: ["_id"]})[0]?.name;
      }

      return tickets;
    } catch (e) {
      throw new Error("Error while searching tickets");
    }
  }

  findUsers(field, value) {
    try {
      const users = this._users.search(value, { fields: [field] });

      for (const user of users) {
        //get assignee tickets
        user.assigneeTickets = this._tickets.search(user._id?.toString(), { fields: ["assignee_id"]});

        //get submitted tickets
        user.submittedTickets = this._tickets.search(user._id?.toString(), { fields: ["submitter_id"]});

        //get organization
        user.organization = this._organizations.search(user.organization_id?.toString(), { fields: ["_id"]})[0]?.name;
      }

      return users;
    } catch (e) {
      throw new Error("Error while searching users");
    }
  }

}

const searchService = new SearchService();
export default searchService;
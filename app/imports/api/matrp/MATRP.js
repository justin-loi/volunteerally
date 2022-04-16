import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../stuff/StuffCollection';
import { AdminProfiles } from '../user/AdminProfileCollection';
import { UserProfiles } from '../user/UserProfileCollection';
// new collection
import { VolunteerProfiles } from '../volunteer/VolunteerProfileCollection';
import { Events } from '../event/EventCollection';
import { OrganizationProfiles } from '../organization/OrganizationProfileCollection';
import { Interests } from '../interest/InterestCollection';
import { SpecialSkills } from '../special_skills/SpecialSkillCollection';
import { Environmental } from '../environmental_preference/EnvironmentalPreferenceCollection';
import { Availabilities } from '../availability/AvailabilityCollection';
import { VolunteerInterest } from '../interest/VolunteerInterestCollection';
import { VolunteerSkill } from '../special_skills/VolunteerSkillCollection';
import { VolunteerEnvironmental } from '../environmental_preference/VolunteerEnvironmentalCollection';
import { VolunteerAvailability } from '../availability/VolunteerAvailabilityCollection';
import { Hours } from '../hours/HoursCollection';
import { VolunteerEventHours } from '../hours/VolunteerEventHours';
import { VolunteerEvent } from '../event/VolunteerEventCollection';
import { OrganizationEvent } from '../event/OrganizationEventCollection';
import { Industries } from '../industry/IndustryCollection';
import { Messages } from '../message/MessageCollection';
import { EndedEvent } from '../event/EndedEventsCollection';
import { EndedEventsVolunteerList } from '../event/EndedEventVolunteerListCollection';

class MATRPClass {
  collections;

  collectionLoadSequence;

  collectionAssociation;

  constructor() {
    // list of all the MATRP collections
    this.collections = [
      AdminProfiles,
      UserProfiles,
      Stuffs,
      VolunteerProfiles,
      Events,
      OrganizationProfiles,
      Interests,
      SpecialSkills,
      Environmental,
      Availabilities,
      VolunteerInterest,
      VolunteerSkill,
      VolunteerEnvironmental,
      VolunteerAvailability,
      Hours,
      Messages,
      VolunteerEventHours,
      VolunteerEvent,
      OrganizationEvent,
      Industries,
      EndedEvent,
      EndedEventsVolunteerList,
    ];
    /*
     * A list of collection class instances in the order required for them to be sequentially loaded from a file.
     */
    this.collectionLoadSequence = [
      AdminProfiles,
      UserProfiles,
      Stuffs,
      VolunteerProfiles,
      Events,
      OrganizationProfiles,
      Interests,
      SpecialSkills,
      Environmental,
      Availabilities,
      VolunteerInterest,
      VolunteerSkill,
      VolunteerEnvironmental,
      VolunteerAvailability,
      Hours,
      Messages,
      VolunteerEventHours,
      VolunteerEvent,
      OrganizationEvent,
      Industries,
      EndedEvent,
      EndedEventsVolunteerList,
    ];

    /*
     * An object with keys equal to the collection name and values the associated collection instance.
     */
    this.collectionAssociation = {};
    this.collections.forEach((collection) => {
      this.collectionAssociation[collection.getCollectionName()] = collection;
    });

  }

  /**
   * Return the collection class instance given its name.
   * @param collectionName The name of the collection.
   * @returns The collection class instance.
   * @throws { Meteor.Error } If collectionName does not name a collection.
   */
  getCollection(collectionName) {
    // console.log('MATRP', collectionName, this.collectionAssociation);
    const collection = this.collectionAssociation[collectionName];
    if (!collection) {
      throw new Meteor.Error(`Called MARTP.getCollection with unknown collection name: ${collectionName}`);
    }
    return collection;
  }
}

export const MATRP = new MATRPClass();

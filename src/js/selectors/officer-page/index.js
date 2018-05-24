import { createSelector } from 'reselect';
import { get, last, map } from 'lodash';
import moment from 'moment';

import { getThisYear } from 'utils/date';
import { extractPercentile } from 'selectors/landing-page/common';


const getOfficerInfo = state => state.officerPage.summary;
const formatCareerDate = inputDate => moment(inputDate).format('ll').toUpperCase();

const getCareerDuration = (dateOfAppt, dateOfResignation) => {
  if (!dateOfAppt && !dateOfResignation) {
    return '';
  }

  const careerStart = formatCareerDate(dateOfAppt);
  const careerEnd = dateOfResignation ? formatCareerDate(dateOfResignation) : 'Present';
  return `${careerStart}—${careerEnd}`;
};

const getCareerDescription = (dateOfAppt, dateOfResignation) => {
  if (!dateOfAppt && !dateOfResignation) {
    return '';
  }

  const endYear = dateOfResignation ? moment(dateOfResignation).year() : getThisYear();
  const yearsSinceAppt = endYear - moment(dateOfAppt).year();
  if (yearsSinceAppt < 1) {
    return '';
  }
  const yearText = yearsSinceAppt === 1 ? 'year' : 'years';
  return `${yearsSinceAppt} ${yearText}`;
};

const getSummaryRank = summary => {
  if (summary.rank === undefined) {
    return '';
  }
  return summary.rank ? summary.rank : 'N/A';
};

export const getOfficerName = state => state.officerPage.fullName;
export const getOfficerId = state => state.officerPage.officerId;
export const getPathname = state => state.officerPage.pathname;
export const breadcrumbCachedFullName = state => state.officerPage.breadcrumbCachedFullName;

export const summarySelector = createSelector(
  getOfficerInfo,
  summary => ({
    unitName: get(summary.unit, 'unit_name'),
    unitDescription: get(summary.unit, 'description'),
    rank: getSummaryRank(summary),
    dateOfAppt: summary['date_of_appt'],
    birthYear: summary['birth_year'],
    race: summary.race,
    gender: summary.gender,
    badge: summary.badge,
    historicBadges: summary['historic_badges'],
    careerDuration: getCareerDuration(summary['date_of_appt'], summary['date_of_resignation']),
    careerDescription: getCareerDescription(summary['date_of_appt'], summary['date_of_resignation']),
    currentSalary: get(summary, 'current_salary', null),
  })
);

export const DATA_NOT_AVAILABLE = 'N/A';

export const metricsSelector = createSelector(
  getOfficerInfo,
  metrics => {
    const percentiles = get(metrics, 'percentiles', []);
    return {
      allegationCount: get(metrics, 'allegation_count', DATA_NOT_AVAILABLE),
      allegationPercentile: get(metrics, 'complaint_percentile', DATA_NOT_AVAILABLE),
      honorableMentionCount: get(metrics, 'honorable_mention_count', DATA_NOT_AVAILABLE),
      sustainedCount: get(metrics, 'sustained_count', DATA_NOT_AVAILABLE),
      disciplineCount: get(metrics, 'discipline_count', DATA_NOT_AVAILABLE),
      honorableMentionPercentile: get(metrics, 'honorable_mention_percentile', DATA_NOT_AVAILABLE),
      useOfForceCount: get(metrics, 'trr_count', DATA_NOT_AVAILABLE),
      majorAwardCount: get(metrics, 'major_award_count', DATA_NOT_AVAILABLE),
      useOfForcePercentile: get(last(percentiles), 'percentile_trr', DATA_NOT_AVAILABLE),
      civilianComplimentCount: get(metrics, 'civilian_compliment_count', DATA_NOT_AVAILABLE),
    };
  }
);

export const getOfficerPercentile = state => state.officerPage.summary.percentiles;

export const officerYearlyThreePercentile = createSelector(
  [getOfficerPercentile],
  (officerPercentiles) => map(officerPercentiles, extractPercentile)
);

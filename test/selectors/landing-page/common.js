import {
  officerCardTransform,
  simpleOfficerTransform,
  pairingCardTransform,
  cardTransform
} from 'selectors/landing-page/common';


describe('common selectors', function () {
  const singleOfficerCard = {
    id: '8562',
    'full_name': 'Jerome Finnigan',
    'complaint_count': 175,
    'sustained_count': 6,
    'complaint_percentile': '99.987',
    'birth_year': 1963,
    race: 'White',
    gender: 'Male',
    percentile: {
      'percentile_trr': '70.069',
      'percentile_allegation_civilian': '99.984',
      'percentile_allegation': '99.987',
      'percentile_allegation_internal': '99.675',
      year: 2018,
      'officer_id': 8562,
    },
    type: 'single_officer'
  };
  const undefinedSingleOfficerCard = {
    id: '8562',
    'full_name': 'Jerome Finnigan',
    'complaint_count': 175,
    'sustained_count': 6,
    'complaint_percentile': '99.987',
    'birth_year': 1963,
    race: 'White',
    gender: 'Male',
    percentile: {
      'percentile_trr': '70.069',
      'percentile_allegation_civilian': '99.984',
      'percentile_allegation': '99.987',
      'percentile_allegation_internal': '99.675',
      year: 2018,
      'officer_id': 8562,
    },
  };
  const pairOfficerCard = {
    'coaccusal_count': 23,
    type: 'coaccused_pair',
    officer2: {
      id: 3454,
      'full_name': 'John Burzinski',
      'birth_year': 1961,
      race: 'White',
      gender: 'Male',
      percentile: {
        'percentile_trr': '74.440',
        'percentile_allegation_civilian': '99.908',
        'percentile_allegation': '99.924',
        'percentile_allegation_internal': '99.566',
        year: 2018,
        'officer_id': 3454,
      }
    },
    officer1: {
      id: 8562,
      'full_name': 'Jerome Finnigan',
      'birth_year': 1963,
      race: 'White',
      gender: 'Male',
      percentile: {
        'percentile_trr': '70.069',
        'percentile_allegation_civilian': '99.984',
        'percentile_allegation': '99.987',
        'percentile_allegation_internal': '99.675',
        'officer_id': 8562,
        year: 2018,
      }
    }
  };
  const officerInfo = {
    id: '8562',
    'full_name': 'Jerome Finnigan',
    'birth_year': 1963,
    race: 'White',
    gender: 'Male',
    percentile: {
      'percentile_trr': '70.069',
      'percentile_allegation_civilian': '99.984',
      'percentile_allegation': '99.987',
      'percentile_allegation_internal': '99.675',
      year: 2018,
      'officer_id': 8562,
    },
  };

  describe('officerCardTransform', function () {
    it('should return an officer information', function () {
      officerCardTransform(singleOfficerCard).should.eql({
        id: '8562',
        officerId: '8562',
        fullName: 'Jerome Finnigan',
        complaintCount: 175,
        sustainedCount: 6,
        complaintPercentile: 99.987,
        birthYear: 1963,
        race: 'white',
        gender: 'male',
        percentile: {
          'items': [
            {
              'axis': 'Use of Force Reports',
              'value': 70.069
            },
            {
              'axis': 'Internal Allegations',
              'value': 99.675
            },
            {
              'axis': 'Civilian Allegations',
              'value': 99.984
            }
          ],
          officerId: 8562,
          textColor: '#DFDFDF',
          visualTokenBackground: '#e94829',
          year: 2018
        },
        type: 'single_officer'
      });
    });
  });

  describe('simpleOfficerTransform', function () {
    it('should return specific information of an officer', function () {
      simpleOfficerTransform(officerInfo).should.eql({
        id: '8562',
        fullName: 'Jerome Finnigan',
        birthYear: 1963,
        race: 'White',
        gender: 'Male',
        percentile: {
          percentileAllegation: '99.987',
          percentileAllegationCivilian: '99.984',
          percentileAllegationInternal: '99.675',
          percentileTrr: '70.069'
        },
        backgroundColor: '#e94829'
      });
    });
  });

  describe('pairingCardTransform', function () {
    it('should return the information of the two officers in the pairing card', function () {
      pairingCardTransform(pairOfficerCard).should.eql({
        type: 'coaccused_pair',
        coaccusalCount: 23,
        officer1: {
          id: 8562,
          fullName: 'Jerome Finnigan',
          birthYear: 1963,
          race: 'White',
          gender: 'Male',
          percentile: {
            percentileAllegation: '99.987',
            percentileAllegationCivilian: '99.984',
            percentileAllegationInternal: '99.675',
            percentileTrr: '70.069'
          },
          backgroundColor: '#e94829'
        },
        officer2: {
          id: 3454,
          fullName: 'John Burzinski',
          birthYear: 1961,
          race: 'White',
          gender: 'Male',
          percentile: {
            percentileAllegation: '99.924',
            percentileAllegationCivilian: '99.908',
            percentileAllegationInternal: '99.566',
            percentileTrr: '74.440'
          },
          backgroundColor: '#e94829'
        }
      });
    });
  });

  describe('cardTransform', function () {
    it('should return the information of a single officer when the type is undefined', function () {
      cardTransform(undefinedSingleOfficerCard).should.eql({
        id: '8562',
        officerId: '8562',
        fullName: 'Jerome Finnigan',
        complaintCount: 175,
        sustainedCount: 6,
        complaintPercentile: 99.987,
        birthYear: 1963,
        race: 'white',
        gender: 'male',
        percentile: {
          'items': [
            {
              'axis': 'Use of Force Reports',
              'value': 70.069
            },
            {
              'axis': 'Internal Allegations',
              'value': 99.675
            },
            {
              'axis': 'Civilian Allegations',
              'value': 99.984
            }
          ],
          officerId: 8562,
          textColor: '#DFDFDF',
          visualTokenBackground: '#e94829',
          year: 2018
        },
        type: undefined
      });
    });
    it('should return the information of a single officer', function () {
      cardTransform(singleOfficerCard).should.eql({
        id: '8562',
        officerId: '8562',
        fullName: 'Jerome Finnigan',
        complaintCount: 175,
        sustainedCount: 6,
        complaintPercentile: 99.987,
        birthYear: 1963,
        race: 'white',
        gender: 'male',
        percentile: {
          'items': [
            {
              'axis': 'Use of Force Reports',
              'value': 70.069
            },
            {
              'axis': 'Internal Allegations',
              'value': 99.675
            },
            {
              'axis': 'Civilian Allegations',
              'value': 99.984
            }
          ],
          officerId: 8562,
          textColor: '#DFDFDF',
          visualTokenBackground: '#e94829',
          year: 2018
        },
        type: 'single_officer'
      });
    });
    it('should return the information of the two officers in the pairing card', function () {
      cardTransform(pairOfficerCard).should.eql({
        type: 'coaccused_pair',
        coaccusalCount: 23,
        officer1: {
          id: 8562,
          fullName: 'Jerome Finnigan',
          birthYear: 1963,
          race: 'White',
          gender: 'Male',
          percentile: {
            percentileAllegation: '99.987',
            percentileAllegationCivilian: '99.984',
            percentileAllegationInternal: '99.675',
            percentileTrr: '70.069'
          },
          backgroundColor: '#e94829'
        },
        officer2: {
          id: 3454,
          fullName: 'John Burzinski',
          birthYear: 1961,
          race: 'White',
          gender: 'Male',
          percentile: {
            percentileAllegation: '99.924',
            percentileAllegationCivilian: '99.908',
            percentileAllegationInternal: '99.566',
            percentileTrr: '74.440'
          },
          backgroundColor: '#e94829'
        }
      });
    });
  });
});

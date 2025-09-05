// GraphQL query strings for Amplify generateClient

export const GET_USER_BY_EMAIL = `
  query GetWaitlistUser($email: String!) {
    getWaitlistUser(email: $email) {
      id
      email
      fullName
      refCode
      referralCount
      createdAt
    }
  }
`;

export const GET_USER_BY_REF_CODE = `
  query GetWaitlistUserByRefCode($refCode: String!) {
    listWaitlistUsersByRefCode(refCode: $refCode) {
      items {
        id
        email
        fullName
        refCode
        referralCount
        createdAt
      }
    }
  }
`;

export const LIST_ALL_USERS = `
  query ListWaitlistUsers {
    listWaitlistUsers {
      items {
        id
        email
        fullName
        country
        city
        refCode
        referrerCode
        referralCount
        utm_source
        utm_medium
        utm_campaign
        userAgent
        deviceType
        signupLocation
        createdAt
        status
      }
      nextToken
    }
  }
`;

export const GET_REFERRAL_STATS = `
  query GetReferralStats {
    getReferralStats {
      totalUsers
      totalReferrals
      viralCoefficient
      topReferrers {
        email
        fullName
        refCode
        referralCount
      }
    }
  }
`;
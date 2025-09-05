// Note: GraphQL strings will be used with generateClient
// Once Amplify backend is set up, these will be auto-generated

export const CREATE_WAITLIST_USER = `
  mutation CreateWaitlistUser(
    $email: String!
    $fullName: String
    $country: String
    $city: String
    $refCode: String!
    $referrerCode: String
    $utm_source: String
    $utm_medium: String
    $utm_campaign: String
    $utm_term: String
    $utm_content: String
    $landing_url: String
    $referrer_url: String
    $userAgent: String
    $deviceType: String
    $ipHash: String
    $signupLocation: AWSJSON
  ) {
    createWaitlistUser(input: {
      email: $email
      fullName: $fullName
      country: $country
      city: $city
      refCode: $refCode
      referrerCode: $referrerCode
      referralCount: 0
      utm_source: $utm_source
      utm_medium: $utm_medium
      utm_campaign: $utm_campaign
      utm_term: $utm_term
      utm_content: $utm_content
      landing_url: $landing_url
      referrer_url: $referrer_url
      userAgent: $userAgent
      deviceType: $deviceType
      ipHash: $ipHash
      signupLocation: $signupLocation
      emailVerified: true
      status: "active"
    }) {
      id
      email
      fullName
      refCode
      referralCount
      createdAt
    }
  }
`;

export const UPDATE_REFERRAL_COUNT = `
  mutation UpdateReferralCount($refCode: String!, $referralCount: Int!) {
    updateWaitlistUserByRefCode(refCode: $refCode, input: {
      referralCount: $referralCount
    }) {
      id
      refCode
      referralCount
    }
  }
`;
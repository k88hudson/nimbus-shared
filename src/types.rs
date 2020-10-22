pub struct NimbusExperiment {
  pub slug: String,
  pub application: String,
  pub user_facing_name: String,
  pub user_facing_description: String,
  pub is_enrollment_paused: bool,
  pub bucket_config: BucketConfig,
  pub probe_sets: Vec<String>,
  pub branches: Vec<Branch>,
  pub targeting: Option<String>,
  pub start_date: Option<String>,
  pub end_date: Option<String>,
  pub proposed_duration: Option<u32>,
  pub proposed_enrollment: u32,
  pub reference_branch: Option<String>,
  pub filter_expression: String,
  pub id: String,
}

pub struct FeatureConfig {
  pub feature_id: String,
  pub enabled: bool,
  pub value:
}

pub struct Branch {
  pub slug: String,
  pub ratio: u32,
  pub feature: Option<FeatureConfig>,
}

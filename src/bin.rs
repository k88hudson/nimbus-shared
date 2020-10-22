use nimbus::NimbusExperiment;
use schemars::schema_for;

fn main() {
  let schema = schema_for!(NimbusExperiment);
  println!("{}", serde_json::to_string_pretty(&schema).unwrap());
}

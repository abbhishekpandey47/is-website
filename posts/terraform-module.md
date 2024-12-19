# **Introduction to Terraform Modules**

As a DevOps engineer, we often face the challenge of maintaining consistent and reliable infrastructure across multiple environments like development, staging, and production. we might find ourselves repeating the same code block to create VPCs, S3 buckets, or EC2 instances across different environments. This approach often leads to mistakes, such as failing to add a required tag or specifying the wrong variable, which can cause deployment issues or inconsistencies within your infrastructure. As the organization’s infrastructure scales, these issues become harder to track and fix, making the entire process more complex and time-consuming.

This is where Terraform modules come in, making it easier to manage infrastructure by breaking it into smaller, reusable block of terraform configuration files. For example, instead of writing separate code blocks to create VPCs, S3 buckets, or EC2 instances for development, staging, and production environments, you can define these resources once in a module. Then, you can use the module in each environment with the necessary variables. This approach keeps your IaC code clean and structured, avoids repeating the same logic, and simplifies updatesFor example, if you need to update the bucket’s versioning settings or modify its access policies, you only need to make the change in the module once, and it will apply everywhere the module is used.

In this blog, we’ll explore Terraform modules in depth, including what they are, how they work, and how they can transform the way you manage and structure your infrastructure code.


## **What is a Terraform Module?**

A Terraform module is like a ready-made blueprint for building your organization’s infrastructure. It’s a set of Terraform Configuration files grouped together to handle specific tasks, such as creating a VPC, setting up S3 buckets, or launching EC2 instances. Instead of writing the same configuration over and over for different environments or projects, you define it once in a module and reuse it wherever needed. This not only keeps your code clean and organized but also saves time and reduces errors.

Modules are reusable, and you can share them across projects or teams. They also make updates easier. For example, if you need to change how a resource is configured, you only update the module, and the changes can be applied to every environment that uses it. This simplifies maintenance and ensures consistency across your infrastructure.


![terraform-module](/PostImages/terraform-modules/terraform-module.png)


**Components of a Terraform Module**

A Terraform module consists of three configuration files that define its functionality and customization options: **main.tf** for the core resource definitions, **variable.tf** for setting input parameters, and **output.tf** for exposing the module’s results. These files work together to make the module clear, reusable, and simple to manage.

```
s3-module/
├── main.tf
├── outputs.tf
└── variables.tf
```

A Terraform module is built on these configuration files that define its resources, inputs, and outputs:



* **main.tf**: This file contains the core configuration for creating resources. It defines exactly what Terraform should build, such as specifying an S3 bucket, an EC2 instance, or a VPC with specific subnets and routing. It’s the blueprint for the module’s functionality, laying out the details of each resource.
* **variables.tf**: This file defines the input parameters that allow you to customize the module’s behavior. For example, you can specify the bucket name for an S3 resource, the instance type for an EC2 instance, or the CIDR block for a VPC. By setting these inputs, you can reuse the same module across different environments or projects without modifying the main code.
* **outputs.tf**: This file captures and returns key information about the resources created by the module. For example, it might provide the ID of a newly created resource, the DNS name of a load balancer, or the endpoint URL of an API. These outputs are essential for referencing resources in other parts of your Terraform setup or for external use.

These files work together to keep your module organized, flexible, and easy to use in any project.


## **Benefits of Using Terraform Modules**

As the organization’s infrastructure scales, managing it with repetitive code becomes a challenge. Many devops engineers start by duplicating blocks of Terraform code to create resources like S3 buckets, EC2 instances, or VPCs for different environments, such as development, staging, and production. While this might seem convenient at first, it often leads to unclean code, increased errors, and inconsistencies between environments.

This is where Terraform modules make a real difference. Instead of rewriting the same configuration files, you can define a resource setup once in a module and reuse it across environments like development, staging, and production by passing in specific values, such as unique bucket names, instance types, or CIDR blocks. this approach keeps your configurations consistent, reduces manual effort, and simplifies management as your infrastructure scales.

In large projects, keeping the IaC resources consistent across environments can be a tough job. The slight differences, like using the wrong naming Convention, missing security rules, or forgetting to add tags, can easily happen. These small mistakes can cause confusion, lead to errors, or even create security risks as the organization’s infrastructure scales.

Terraform modules help us by letting us define how resources should be set up in one place. For example, you can create a module to standardize S3 bucket configurations, including their names, policies, and lifecycle rules. Another module can handle EC2 instances, ensuring the same instance types, AMIs, and security groups are used everywhere. By using those modules, you make sure that your infrastructure stays consistent, reducing mistakes and making it easier to manage.


## **How to Create a Terraform Module**

Creating a Terraform module is all about structuring your code to make it reusable and easy to manage. Instead of scattering configurations across multiple files, you can group them in a well defined folder that handles everything, like resource definitions, inputs, and outputs. To better understand how modules work, let’s walk through the process of creating one. We’ll start by building a simple module to set up an S3 bucket, step by step.

```
s3-module/
├── main.tf
├── outputs.tf
└── variables.tf
```

This structure makes the module reusable and easy to manage. You can include it in any Terraform configuration, provide specific values using variables, and receive important information through outputs. This method helps keep your iac code structured, reduces duplication, and ensures it’s adaptable for different projects and environments.

Now, we’ll create a **main.tf** configuration file

```hcl
resource "aws_s3_bucket" "this"{
  bucket = var.bucket_name
 	versioning {
 	enabled = var.enable_versioning
  }
tags = var.tags
}
```

In this code, an AWS S3 bucket is created using Terraform. The bucket name is set using the variable `var.bucket_name`, allowing customization. The `versioning` block enables or disables versioning for the bucket based on the value of `var.enable_versioning`. The `tags` attribute assigns metadata to the bucket, such as environment or project details, using the values provided in `var.tags`. This configuration makes the bucket setup flexible and reusable.

Now , we’ll create the **variable.tf** configuration file

```hcl
variable "bucket_name" {
  description = "The name of teh S3 bucket"
	type   = string
}
variable "enable_versioning" {
 description = "Enable versioning for the S3 bucket"
	type  = bool
	default = false
}
variable "tags" {
  description = "Tags to associate with the S3 bucket"
  type  = map(string)
  default = {}
}
```
This code defines three input variables to customize the S3 bucket setup. The `bucket_name` variable is a required string that specifies the bucket's unique name. The `enable_versioning` variable is a boolean that controls whether versioning is enabled for the bucket, with a default value of `false`. The `tags` variable is a map of key-value pairs used to assign metadata to the bucket, such as project or environment details, and defaults to an empty map if no tags are provided. These variables make the configuration flexible and reusable for different scenarios.

Now we’ll create the **output.tf** configuration file

```hcl
output "bucket_name" {
  description = "The name of the S3 bucket"
	value  = aws_s3_bucket.this.bucket
}
output "bucket_arn" {
  description = "The arn of the S3 Bucket"
	Value  =  aws_s3_bucket.this.arn
}
```

This code defines two outputs to provide useful information about the S3 bucket after it is created. The `bucket_name` output returns the name of the S3 bucket, allowing it to be referenced in other parts of the Terraform configuration or externally. The `bucket_arn` output provides the Amazon Resource Name (ARN) of the bucket, which is a unique identifier used for access policies or linking the bucket with other AWS services. These outputs make it easier to integrate the S3 bucket with other resources or applications.

So far, we’ve built a Terraform module, and now it’s time to use it to create resources. To do this, we’ll create a **main.tf** file, either in a separate directory or in the root directory. This file will reference the module we created and provide the necessary inputs to deploy the resources defined within the module.

```
terraform-module/
 ├── s3-module/
 |    	├── main.tf
 |    	├── outputs.tf
 |    	└── variables.tf
 |────── main.tf
```

Create a **main.tf** configuration file

```hcl
provider "aws" {
  region = "us-east-1"
}
module "s3_bucket" {
  source = "./s3-module"
	bucket_name = "my-terraform-s3-module-2024"
	enable_versioning = true
  	tags = {
	enviroment = "Dev"
  }
}
output "s3_bucket_name" {
  value = module.s3_bucket.bucket_name
}
output "s3_bucket_arn" {
value = module.s3_bucket.bucket_arn
}
```

This code sets up an AWS provider for the `us-east-1` region and uses a custom Terraform module, `s3_bucket`, to create an S3 bucket. The module takes inputs such as the bucket name (`my-terraform-s3-module-2024`), enables versioning, and assigns a tag with the environment set to "Dev." Two outputs are defined: `s3_bucket_name` returns the name of the created S3 bucket, and `s3_bucket_arn` provides its Amazon Resource Name (ARN), making it easy to reference the bucket elsewhere in the configuration.

Now let’s try the terraform module by running the following `Terraform init` commands :

```bash
Initializing the backend...
Initializing modules...
- s3_bucket in s3-module
Initializing provider plugins...
- Finding latest version of hashicorp/aws...
- Installing hashicorp/aws v5.80.0...
- Installed hashicorp/aws v5.80.0 (unauthenticated)
Terraform has created a lock file .terraform.lock.hcl to record the provider
selections it made above. Include this file in your version control repository
so that Terraform can guarantee to make the same selections by default when
you run "terraform init" in the future.
Terraform has been successfully initialized!
```

By running the terraform init command, we initialized the terraform in the directory. now, moving further, we’ll run the following `terraform plan` command :

```bash
Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
  + create
Terraform will perform the following actions:
  # module.s3_bucket.aws_s3_bucket.this will be created
  + resource "aws_s3_bucket" "this" {
  	+ acceleration_status     	= (known after apply)
  	+ acl                     	= (known after apply)
  	+ arn                     	= (known after apply)
  	+ bucket                  	= "my-terraform-s3-module-2024"
  	+ bucket_domain_name      	= (known after apply)
  	+ bucket_prefix           	= (known after apply)
  	+ bucket_regional_domain_name = (known after apply)
  	+ force_destroy           	= false
  	+ hosted_zone_id          	= (known after apply)
  	+ id                      	= (known after apply)
  	+ object_lock_enabled     	= (known after apply)
  	+ policy                  	= (known after apply)
  	+ region                  	= (known after apply)
  	+ request_payer           	= (known after apply)
  	+ tags                    	= {
      	+ "Environment" = "Dev"
              	}
  	+ tags_all                	= {
     	+ "Environment" = "Dev"
            	}
  	+ website_domain          	= (known after apply)
  	+ website_endpoint        	= (known after apply)
  	+ cors_rule (known after apply)
  	+ grant (known after apply)
  	+ lifecycle_rule (known after apply)
  	+ logging (known after apply)
  	+ object_lock_configuration (known after apply)
  	+ replication_configuration (known after apply)
  	+ server_side_encryption_configuration (known after apply)
  	+ versioning {
     	+ enabled	= true
      	+ mfa_delete = false
    	}
  	+ website (known after apply)
	}
Plan: 1 to add, 0 to change, 0 to destroy.
Changes to Outputs:
  + s3_bucket_arn  = (known after apply)
  + s3_bucket_name = "my-terraform-s3-module-2024"
```
Once the `terraform plan` command runs successfully and shows the expected changes, proceed with the `terraform apply` command to create the resources. This step will execute the planned changes and deploy the infrastructure defined in your configuration. Always review the plan carefully before applying it to avoid unintended changes.

``` bash
Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
  + create
Terraform will perform the following actions:
  # module.s3_bucket.aws_s3_bucket.this will be created
  + resource "aws_s3_bucket" "this" {
  	+ acceleration_status     	= (known after apply)
  	+ acl                     	= (known after apply)
  	+ arn                     	= (known after apply)
  	+ bucket                  	= "my-terraform-s3-module-2024"
  	+ bucket_domain_name      	= (known after apply)
  	+ bucket_prefix           	= (known after apply)
  	+ bucket_regional_domain_name = (known after apply)
 	+ force_destroy           	= false
  	+ hosted_zone_id          	= (known after apply)
	+ id                      	= (known after apply)
  	+ object_lock_enabled     	= (known after apply)
  	+ policy                  	= (known after apply)
  	+ region                  	= (known after apply)
  	+ request_payer           	= (known after apply)
  	+ tags                    	= {
      	+ "Environment" = "Dev"
            	}
  	+ tags_all                	= {
      	+ "Environment" = "Dev"
              	}
  	+ website_domain          	= (known after apply)
  	+ website_endpoint        	= (known after apply)
  	+ cors_rule (known after apply)
  	+ grant (known after apply)
  	+ lifecycle_rule (known after apply)
  	+ logging (known after apply)
  	+ object_lock_configuration (known after apply)
  	+ replication_configuration (known after apply)
  	+ server_side_encryption_configuration (known after apply)
  	+ versioning {
      	+ enabled	= true
      	+ mfa_delete = false
    	}
  	+ website (known after apply)
	}
Plan: 1 to add, 0 to change, 0 to destroy.
Changes to Outputs:
  + s3_bucket_arn  = (known after apply)
module.s3_bucket.aws_s3_bucket.this: Creating...
module.s3_bucket.aws_s3_bucket.this: Creation complete after 8s [id=my-terraform-s3-module-2024]
Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
Outputs:
s3_bucket_arn = "arn:aws:s3:::my-terraform-s3-module-2024"
s3_bucket_name = "my-terraform-s3-module-2024"
```
## **Best Practices for Terraform Modules**

Creating Terraform modules isn’t just about reusing code; it’s about designing them to be clear, simple, and dependable. A well-designed terraform module should make it easy for others to understand, customize, and maintain. To achieve this, you must follow best practices that ensure your modules are user-friendly and work seamlessly in different scenarios. Let’s look at some key practices to help you build modules that are not only reusable but also easy to manage and adapt over time.



* Keep Modules Simple and Task-Specific

A well-designed Terraform module should focus on one specific task and do it effectively. For example, if you’re creating a module for an S3 bucket, it should only handle the bucket’s configuration, such as its name, versioning, tags, and access policies. Don’t include unrelated resources, like EC2 instances or IAM roles, in the same module. Keeping tasks separate makes the module easier to understand, reuse in different environments, and fix if something goes wrong. Simple and focused modules are easier to manage and adapt over time.



* Use Input Variables

input variables make your module more adaptable. Instead of hardcoding values like bucket names, instance types, or CIDR blocks, you can define variables that allow users to pass in their own values when they use the module. For example, a variable for `bucket_name` lets users specify a unique name for the S3 bucket.

```hcl
Bucket = var.bucket_name
```



* Maintain Clear Naming and Documentation

Maintaining clear and consistent naming for your module files, variables, and outputs is important for making the module easy to understand and use. For example, use descriptive names like `bucket_name` instead of unclear ones like `bName`. Similarly, an output labeled as `bucket_arn` is much more informative than simply calling it `arn`. Consistent naming ensures that anyone using or maintaining the module can quickly understand its purpose and functionality, saving time and reducing confusion.


## **Conclusion**

Terraform modules make managing the organization’s infrastructure easier by turning repeated code into reusable modules. They help keep your setup organized, consistent, and simple to maintain. By keeping modules focused, using variables for flexibility, and testing them, you can create a reliable infrastructure that scales with your needs.

## **FAQ**


**1.  Why should I use Terraform modules?**

Modules save time by allowing you to reuse code instead of writing it repeatedly. They help maintain consistency across projects and simplify managing large, complex infrastructure setups.

**2. How do I share Terraform modules across an organization?**

Terraform Cloud's Private Module Registry allows you to share Terraform modules across an organization. You can also enforce rules on the registry to specify how members of your organization can use the modules.

**3. How do I test a Terraform module?**

You can test a module by creating a separate Terraform configuration that calls the module with different input values. Use the `terraform plan` and `terraform apply` to verify it works correctly and outputs the expected results.


**4. What is the difference between Terraform modules and blueprints?**


Terraform modules and blueprints are both used to organize infrastructure, but they’re not the same:

**Terraform Modules** are like reusable pieces of code that handle specific tasks, like creating an S3 bucket or setting up a VPC. You can use them in different projects to save time.

**Blueprints** are more like complete plans that combine several modules and configurations to build an entire setup, like a full application environment with networking, servers, and storage.

Think of modules as building blocks and blueprints as the full structure made from those blocks.


**5. What happens if I don’t use modules?**


Without modules, you may end up writing repetitive code, which makes your configuration harder to manage and maintain. Modules help you avoid duplication and keep everything consistent.


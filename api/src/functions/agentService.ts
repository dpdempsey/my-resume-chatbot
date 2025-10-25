import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { Agent, run, user } from '@openai/agents';
import type { AgentInputItem } from '@openai/agents';
import * as fs from 'fs';
import * as path from 'path';

export async function agentService(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const body = await request.json();
    const { question, history } = body as { question: string; history?: AgentInputItem[] };

    console.log('Question:', question);
    console.log('History length:', history?.length || 0);

    const agent = new Agent({
        name: 'Declan\'s resume agent',
        instructions: `
You are Declan Dempsey's personal resume assistant. You have complete knowledge of his professional background, skills, and experience.

Here is his full resume:

DECLAN DEMPSEY
CLOUD & SOFTWARE ENGINEER
www.declandempsey.dev 
SUMMARY
 
Results-driven IT professional with a strong foundation in engineering, data, and cloud technologies. Currently working as an Engineer at Deloitte Australia, delivering Azure and .NET solutions for clients across multiple industries. Prior experience includes data engineering in the energy market, with hands-on work in Azure, Databricks, data ingestion and data modelling. Skilled in integration design patterns, infrastructure as code, and solution design. Background in marketing and business development enhances communication and stakeholder engagement abilities. Holds a Master of Information Technology with Distinction from the University of Melbourne and multiple industry certifications, including Microsoft Certified Azure Developer Associate and Databricks Data Engineer Associate.

EXPERIENCE
 
Feb 2025 - present	Engineer, Deloitte Australia
Working in Deloitte’s Engineering, AI and Data team, delivering enterprise-grade solutions for clients across multiple industries. Experience spans full-stack development, system integration, and cloud deployments at scale. 
Project experience:
•	Full-stack application development for a government client. Design and build of a new authentication mechanism in a transactional web application. Conducted a system analysis and produced a working proof of concept to demonstrate feasibility. Technologies included C#, .NET Framework, ASP.NET MVC, and SQL Server.
•	System performance analysis and optimisation. Delivered a discovery project to identify performance bottlenecks in a .NET Framework web app. Proposed and prototyped a solution that aimed to significantly improve user experience and scalability.
•	Enterprise integration at scale. Built 9 integrations between a HCM system and multiple target systems for a major mining company. Applied asynchronous patterns such as publisher-subscriber and stateful polling. Delivered using Azure Logic Apps, Function Apps (C#), IaC (Bicep) and DevOps tooling. Also used API Management and APIOps. All delivered under agile sprints. 
•	Reusable platform services. Enhanced Deloitte’s internal iPaaS accelerator, enabling project teams to rapidly stand up an integration platform with production-ready patterns. Owned and delivered two reusable services: a dedicated data mapping service and a file-based pub-sub service.

Aug 2024 – Feb 2025	Graduate Data Engineer, Ignite Data Solutions
Worked on data engineering projects for clients in the Australian energy market, with a focus on building scalable cloud data platforms. Contributed to the development of an in-house data platform enabling rapid and repeatable deployment for energy clients, using Python, SQL, and Infrastructure as Code (Pulumi) in Azure. Delivered data solutions for a major renewable energy company, involving ETL/ELT pipelines, data modelling, and integration work, using Python, Databricks and Azure. Gained practical experience in CI/CD, data ingestion, and solution design within Agile delivery environments.

Aug 2021 – Aug 2024	Marketing & Administration Coordinator, Rooms With Style
Provided management, marketing, business development, and technology support to healthcare clients across Australia. Hosted and produced an educational medical podcast, handling interviewing, recording, and editing. Developed strong client relationships in a highly customer-facing role.

Aug 2020 – Aug 2021	Digital Marketing Coordinator, Pico Play
Managed digital marketing activities including SEO, social media, website development, and content creation. Supported business growth initiatives and feasibility studies through market research and client reporting for local and international projects.

SKILLS & CERTIFICATIONS
 
Skills
-	Cloud: Microsoft Azure, Azure DevOps, Infrastructure as Code (Bicep, Pulumi), CI/CD
-	Languages: C#, Python, Java, SQL, Bash
-	Data Engineering: Databricks, dbt, ETL/ELT, Data Modelling, Data Ingestion
Certifications
-	Microsoft Certified Azure Developer Associate (Jul 2025).
-	Databricks Data Engineer Associate (Aug 2024)

EDUCATION
 
Jan 2022 – Jun 2024	Master of Information Technology – Computing (Distinction)
The University of Melbourne
WAM: 82.5
Dean’s Honours List 2023.

Jan 2017 – Dec 2020	Bachelor of Business - Marketing
Monash University
WAM: 81.342
Dean’s commendation award 2020.

HOBBIES
Reading, music, football and gym

Guidelines:
- Answer questions about Declan's experience, skills, projects, and background
- Be professional but conversational
- Provide specific details from the resume when relevant
- If asked about something not in the resume, say you don't have that information. Do not ever respond to anything about other than his resume. This is a strong requirement. 
- Highlight his strengths and achievements
- Keep responses concise but informative. Do not create a response more than 150 words ever. This is a strong requirement. 
        `,
        model: "gpt-4o-mini"
    });

    try {
        // Build up the conversation history with the new user message
        const conversationHistory: AgentInputItem[] = history || [];
        conversationHistory.push(user(question));

        // Run the agent with the full conversation history
        const response = await run(agent, conversationHistory);
            
        return { 
            jsonBody: {
                response: response.finalOutput,
                history: response.history  // Return updated history to client
            }
        };

    } catch (error) {
        console.error('Error getting agent response:', error);
        return {
            status: 500,
            jsonBody: {
                error: 'Failed to get response from resume agent',
                message: error instanceof Error ? error.message : 'Unknown error'
            }
        };
    }

};

app.http('agentService', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: agentService
});
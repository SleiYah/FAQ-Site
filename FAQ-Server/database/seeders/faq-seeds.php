<?php
include_once(__DIR__ . "../../../models/FAQ.php");

class SeedFaqs {
    public static function seed($conn) {
        echo "Seeding faqs table with SDLC FAQs...\n";
        
        $faqObj = new FAQ($conn);
        
        $faqs = [
            [
                'question' => 'What is a Software Development Lifecycle (SDLC)?',
                'answer' => 'An SDLC is a conceptual framework that describes the structure of stages involved in software development. It provides a systematic approach to move a software project from initial concept through to deployment and maintenance.'
            ],
            [
                'question' => 'What\'s the difference between a model and a methodology in SDLC?',
                'answer' => 'A model is descriptive, outlining what should be done, while a methodology is prescriptive, detailing both what and how tasks should be performed.'
            ],
            [
                'question' => 'What are the three broad categories of SDLC models?',
                'answer' => 'SDLC models can be classified into: 1) Linear Models - Sequential approaches where one stage leads to the next upon completion; 2) Iterative Models - Cyclic approaches where stages are revisited to implement improvements; and 3) Combined Models - Approaches that incorporate elements of both linear and iterative models.'
            ],
            [
                'question' => 'How does the effectiveness of SDLC models vary by software type?',
                'answer' => 'The effectiveness varies according to software categories: Category 1 (Back-end functionality software), Category 2 (Middle-tier software for business logic), and Category 3 (Front-end applications with visual interfaces).'
            ],
            [
                'question' => 'What is the Waterfall model?',
                'answer' => 'The Waterfall model, first documented by Benington (1956) and modified by Royce (1970), is characterized by sequential progression through distinct phases, extensive documentation, verification activities, and feedback loops allowing for stage revalidation.'
            ],
            [
                'question' => 'What documentation is required for the Waterfall model?',
                'answer' => 'Requirements document, preliminary design specification, interface design specification, final design specification, test plan, and operations manual.'
            ],
            [
                'question' => 'What are the limitations of the Waterfall model?',
                'answer' => 'It assumes requirements are well-defined and unchanging, offers limited flexibility to accommodate changes, and late testing can lead to costly rework.'
            ],
            [
                'question' => 'What is the B-Model in SDLC?',
                'answer' => 'The B-Model, introduced by Birrell and Ould (1988), extends the Waterfall model by incorporating an operational lifecycle, providing pathways for system enhancement and accounting for potential obsolescence.'
            ],
            [
                'question' => 'What is the Incremental Model?',
                'answer' => 'Also known as the iterative Waterfall model, it can be viewed as a three-dimensional representation of the Waterfall model with multiple iterations, where each iteration improves functionality incrementally.'
            ],
            [
                'question' => 'What are the strengths of the Incremental Model?',
                'answer' => 'Feedback from earlier iterations can be incorporated, stakeholders can be involved throughout, it facilitates early delivery with incremental feature expansion, and enables better monitoring of issues.'
            ],
            [
                'question' => 'What is the V-Model?',
                'answer' => 'Developed by NASA (1991), it represents a variation of the Waterfall model with enhanced verification, featuring a V-shaped structure with decomposition on the left leg and integration on the right.'
            ],
            [
                'question' => 'What variations exist of the V-Model?',
                'answer' => 'The Vee+ Model adds user involvement, risks, and opportunities, while the Vee++ Model adds intersecting processes for decomposition and verification.'
            ],
            [
                'question' => 'What is the Spiral Model?',
                'answer' => 'Introduced by Boehm (1986), it represents a paradigm shift from specification-driven to risk-driven development, featuring four quadrants: objectives, risk analysis, development, and planning.'
            ],
            [
                'question' => 'What is the process flow in the Spiral Model?',
                'answer' => '1) Determine objectives; 2) Evaluate alternatives and identify/resolve risks; 3) Develop and test; 4) Plan the next iteration.'
            ],
            [
                'question' => 'What is the Wheel-and-spoke Model?',
                'answer' => 'Based on the Spiral model, it emphasizes a bottom-up approach with smaller initial teams, where common requirements form the hub with programs as spokes, and multiple iterations form a wheel.'
            ],
            [
                'question' => 'What is the Unified Process Model?',
                'answer' => 'Developed by Rational Software in the 1990s (commonly known as RUP), it addresses object-oriented software development needs, utilizes Unified Modeling Language (UML), and incorporates best practices including iterative development.'
            ],
            [
                'question' => 'What are the core disciplines in the Unified Process Model?',
                'answer' => 'Business modeling, requirements, analysis and design, implementation, testing, and deployment.'
            ],
            [
                'question' => 'What is the RAD Model?',
                'answer' => 'Developed by James Martin (1991), the Rapid Application Development (RAD) model emphasizes prototyping and user involvement, featuring a collaborative environment, decentralized decision-making, and minimal documentation.'
            ],
            [
                'question' => 'What methodologies have emerged from the RAD approach?',
                'answer' => 'Agile, Extreme Programming (XP), Joint Application Development (JAD), Lean Development (LD), and Scrum.'
            ],
            [
                'question' => 'What are the characteristics of Agile methodologies?',
                'answer' => 'They break projects into small sub-projects, use short intervals with incremental releases, emphasize real-time face-to-face communication, and are best for Category 3 applications.'
            ],
            [
                'question' => 'What are the features of Extreme Programming (XP)?',
                'answer' => 'Incremental development with a business champion, pair programming, no initial design stage, and accommodation of new requirements in short spiral steps.'
            ],
            [
                'question' => 'What is the philosophy behind Lean Development?',
                'answer' => '"80% today is better than 100% tomorrow," emphasizing early delivery with minimal functionality.'
            ],
            [
                'question' => 'What are the characteristics of Scrum?',
                'answer' => 'Short iterations (sprints), daily progress measurement, and suitability for small projects with self-organizing teams.'
            ],
            [
                'question' => 'What factors should be considered when selecting an SDLC model?',
                'answer' => 'Software category, project complexity, requirements stability, team structure, risk profile, documentation needs, and organizational culture.'
            ],
            [
                'question' => 'What are the emerging trends in SDLC evolution?',
                'answer' => 'Knowledge sharing between software and systems disciplines, incorporation of techniques from other domains, bi-directional knowledge sharing, central knowledge repositories, contextual model comparison, and statistical analysis of effectiveness.'
            ]
        ];
        
        foreach ($faqs as $faqData) {
            $faqObj->create($faqData);
            echo "FAQ created: " . $faqData['question'] . "\n";
        }
        
        echo "SDLC FAQs seeding completed\n";
    }
}
?>
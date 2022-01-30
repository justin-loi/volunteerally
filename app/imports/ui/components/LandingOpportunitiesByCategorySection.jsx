import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const LandingOpportunitiesByCategorySection = () => (
  <Grid verticalAlign='middle' textAlign='center' rows='equal' container>
    <Grid.Row>
      <p className="landing-header-3">
        Browse Opportunities By Category
      </p>
    </Grid.Row>
    <Grid.Row columns='equal'>
      <Grid.Column padded='vertically'>
        <div className="ui move up reveal">
          <div className="visible content">
            <Image src="/images/category-family-services-front.png" className="ui large image"/>
          </div>
          <div className="hidden content">
            <Image src="/images/category-family-services-back.png" className="ui large image"/>
          </div>
        </div>
      </Grid.Column>
      <Grid.Column>
        <div className="ui move up reveal">
          <div className="visible content">
            <Image src="/images/category-covid-19-front.png" className="ui large image"/>
          </div>
          <div className="hidden content">
            <Image src="/images/category-animal-welfare-back.png" className="ui large image"/>
          </div>
        </div>
      </Grid.Column>
      <Grid.Column>
        <div className="ui move up reveal">
          <div className="visible content">
            <Image src="/images/category-crisis-relief-front.png" className="ui large image"/>
          </div>
          <div className="hidden content">
            <Image src="/images/category-crisis-relief-back.png" className="ui large image"/>
          </div>
        </div>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row columns='equal'>
      <Grid.Column>
        <div className="ui move up reveal">
          <div className="visible content">
            <Image src="/images/category-education-front.png" className="ui large image"/>
          </div>
          <div className="hidden content">
            <Image src="/images/category-family-services-back.png" className="ui large image"/>
          </div>
        </div>
      </Grid.Column>
      <Grid.Column>
        <div className="ui move up reveal">
          <div className="visible content">
            <Image src="/images/category-environment-front.png" className="ui large image"/>
          </div>
          <div className="hidden content">
            <Image src="/images/category-environment-back.png" className="ui large image"/>
          </div>
        </div>
      </Grid.Column>
      <Grid.Column>
        <div className="ui move up reveal">
          <div className="visible content">
            <Image src="/images/category-elderly-care-front.png" className="ui large image"/>
          </div>
          <div className="hidden content">
            <Image src="/images/category-elderly-care-back.png" className="ui large image"/>
          </div>
        </div>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row columns='equal'>
      <Grid.Column>
        <div className="ui move up reveal">
          <div className="visible content">
            <Image src="/images/category-housing-front.png" className="ui large image"/>
          </div>
          <div className="hidden content">
            <Image src="/images/category-elderly-care-back.png" className="ui large image"/>
          </div>
        </div>
      </Grid.Column>
      <Grid.Column>
        <div className="ui move up reveal">
          <div className="visible content">
            <Image src="/images/category-homeless-front.png" className="ui large image"/>
          </div>
          <div className="hidden content">
            <Image src="/images/category-family-services-back.png" className="ui large image"/>
          </div>
        </div>
      </Grid.Column>
      <Grid.Column>
        <div className="ui move up reveal">
          <div className="visible content">
            <Image src="/images/category-special-needs-front.png" className="ui large image"/>
          </div>
          <div className="hidden content">
            <Image src="/images/category-family-services-back.png" className="ui large image"/>
          </div>
        </div>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row columns='equal'>
      <Grid.Column>
        <div className="ui move up reveal">
          <div className="visible content">
            <Image src="/images/category-animal-welfare-front.png" className="ui huge image"/>
          </div>
          <div className="hidden content">
            <Image src="/images/category-animal-welfare-back.png" className="ui large image"/>
          </div>
        </div>
      </Grid.Column>
      <Grid.Column>
        <div className="ui move up reveal">
          <div className="visible content">
            <Image src="/images/category-food-insecurity-front.png" className="ui large image"/>
          </div>
          <div className="hidden content">
            <Image src="/images/category-food-insecurity-back.png" className="ui large image"/>
          </div>
        </div>
      </Grid.Column>
      <Grid.Column>
        <div className="ui move up reveal">
          <div className="visible content">
            <Image src="/images/category-other.png" className="ui large image"/>
          </div>
          <div className="hidden content">
            <Image src="/images/category-food-insecurity-back.png" className="ui large image"/>
          </div>
        </div>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default LandingOpportunitiesByCategorySection;

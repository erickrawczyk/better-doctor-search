import React from 'react';
import { Avatar, Chip, Divider, FontIcon, Subheader } from 'material-ui';
import { Card, CardHeader, CardText } from 'material-ui/Card';

const Doctor = ({ doctor }) => {
  const styles = {
    card: {
      margin: '5px 0'
    },
    chip: {
      margin: 4,
    },
    chipRow: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    subheader: {
      paddingLeft: 'none'
    }
  };

  const name = `${doctor.profile.first_name} ${doctor.profile.last_name}`;
  const specialties = doctor.specialties.map(s => s.name).join(' | ');

  return (
    <Card style={styles.card}>
      {/* Avatar and name */}
      <CardHeader
        title={name}
        subtitle={specialties}
        actAsExpander={true}
        showExpandableButton={true}
        avatar={doctor.profile.image_url}
      />
      <Divider />

      {/* Expanded area */}
      <CardText expandable={true}>
        
        {/* bio */}
        <Subheader style={styles.subheader}>About</Subheader>
        {doctor.profile.bio || 'No information available'}

        {/* practices (if existent) */}
        {doctor.practices.length ?
          <Subheader style={styles.subheader}>Practices</Subheader>
        : null }

        <div style={styles.chipRow}>
          {doctor.practices.map(practice => {
            return (
              <Chip style={styles.chip} key={practice.uid}>
                <Avatar icon={ <FontIcon className="material-icons"> business </FontIcon> } />
                {practice.name} | {practice.visit_address.city}, {practice.visit_address.state}
              </Chip>
            )
          })}
        </div>
      </CardText>

    </Card>
  )
}

export default Doctor;

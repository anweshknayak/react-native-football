import React, { Component } from 'react';
import styled from 'styled-components/native';
import { images } from './images';
import { AppLoading, Font } from 'expo';
import { FlatList, Text, ScrollView, View, Image } from 'react-native';

class GoalsBody extends Component {

  state = {
		loaded: false,
		players: []
  };

	componentWillReceiveProps(nextProps) {

		console.log(nextProps)

		if(this.props != nextProps) {
			this.setState({
				players: nextProps.players
			})
		}
	}

	componentWillMount() {
		this._loadAssetsAsync();
	}

	_loadAssetsAsync = async () => {
		await Font.loadAsync({
			pt: require('../../assets/fonts/pt.ttf'),
		});
		this.setState({ loaded: true });
	};

  render() {
		if(!this.state.loaded) {
			 return <AppLoading />;
		}

    return (
			<ContainerView>
        <FlatList
          data={
						this.state.players
					}
          renderItem={({item}) => {
						let logo = images[item.team] && images[item.team]["uri"] ? images[item.team]["uri"] : null;
						return (
							<StyledView key={item.name}>
								<TeamLogo source={logo} />
								<PlayerText>{item.player}</PlayerText>
								<InfoText>{item.goals || item.assists}</InfoText>
								<InfoText>{item.team}</InfoText>
							</StyledView>
						)
						}
					}
					keyExtractor={(item, index) => index}
        />
      </ContainerView>
    );
  }
}

const ContainerView = styled.View`

`;

const StyledView = styled.View`
	display: flex;
	flex-direction: row;
	border-bottom-color: rgb(241, 241, 241);
	border-bottom-width: 1px;
	border-style: solid;
	padding: 8px;
`;

const InfoText = styled.Text`
  color: rgb(60, 0, 60);
	font-size: 16px;
	font-family: 'pt';
	flex: 1;
`;

const PlayerText = styled.Text`
  color: rgb(60, 0, 60);
	font-size: 16px;
	font-family: 'pt';
	flex: 2;
`;

const TeamText = styled.Text`
  color: rgb(60, 0, 60);
	font-size: 16px;
	font-family: 'pt';
	flex: 2;
`;

const TeamLogo = styled.Image`
  width: 20px;
	height: 20px;
	margin-right: 10px;
`;

export default GoalsBody;
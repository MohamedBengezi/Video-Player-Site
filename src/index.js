import React, { Component } from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'PLACE KEY HERE';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            videos: [],
            selectedVideo: null
        };
        this.videoSearch('surfboards');
    }
    videoSearch(term){
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });

            //this.setState({videos: videos})
        });
    }
    render(){
        const debVidSearch = _.debounce((term) => {this.videoSearch(term) }, 400);
        return (
            <div>
                <SearchBar onSearchTermChange={debVidSearch}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList 
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos}/>
            </div>
        );
    }
}


ReactDOM.render(<App />, document.querySelector('.container'));

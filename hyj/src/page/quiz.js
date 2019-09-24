import React from 'react';
import { Route } from 'react-router-dom';
import { PackageListC, WritePackage, ReadPackage, NewPackage, minePackageList, 
    anotherPackageList, noneExistPackageList, existPackageList, searchPackage, recoPackageList } from 'containers/Quiz';
import { SingleQuizC, anotherQuiz, mineQuiz, existQuiz, noneExistQuiz, WriteQuiz, ReadQuiz, NewQuiz, tagSelectQuiz, recoQuiz } from 'containers/SingleQuiz';

class Quiz extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Route path="/quiz/packagelist" component={PackageListC}/>
                <Route path="/quiz/minePackageList" component={minePackageList}/>
                <Route path="/quiz/anotherPackageList" component={anotherPackageList}/>
                <Route path="/quiz/noneExistPackageList" component={noneExistPackageList}/>
                <Route path="/quiz/existPackageList" component={existPackageList}/>
                <Route path="/quiz/writepackage/:num" component={WritePackage}/>
                <Route path="/quiz/readpackage/:num" component={ReadPackage}/>
                <Route path="/quiz/singlequiz" component={SingleQuizC}/>
                <Route path="/quiz/anotherQuiz" component={anotherQuiz}/>
                <Route path="/quiz/mineQuiz" component={mineQuiz}/>
                <Route path="/quiz/existQuiz" component={existQuiz}/>
                <Route path="/quiz/noneExistQuiz" component={noneExistQuiz}/>
                <Route path="/quiz/writequiz/:num" component={WriteQuiz}/>
                <Route path="/quiz/readquiz/:num" component={ReadQuiz}/>
                <Route path="/quiz/tagSelectQuiz/:tag" component={tagSelectQuiz}/>
                <Route path="/quiz/newquiz" component={NewQuiz}/>
                <Route path="/quiz/newpackage" component={NewPackage}/>

                <Route path="/quiz/searchPackage/:content" component={searchPackage}/>
                <Route path="/quiz/recoPackageList" component={recoPackageList}/>
                <Route path="/quiz/recoQuiz" component={recoQuiz}/>

            </div>
        );
    }
}

export default Quiz;

import React, { useState, useEffect } from 'react';
import { Slide } from 'react-awesome-reveal';
import { mathchesCollection } from '../../../firebase';

const Blocks = () => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        if (!matches.length > 0) {
            mathchesCollection
                .get()
                .then(snapshot => {
                    const matches = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    console.log(matches);
                })
                .catch(err => console.log(err));
        }
    }, [matches]);

    return <div>hello</div>;
};

export default Blocks;
